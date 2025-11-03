import express, {Request, Response ,NextFunction } from 'express'
import mongoose from 'mongoose'
import dotEvn from 'dotenv'
import cors from 'cors'
import apiRouter from './routes/index.js'


dotEvn.config();
const app = express();

app.use(express.json())
app.use(cors());


app.use('/api/v1', apiRouter );

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Somthing went wrong.'
    })
})

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL as string)
.then(() => {
    app.listen(PORT, () => console.log(`application is running on ${PORT}`))
})
.catch((err) => {
    console.log('Something went wrong :', err);
})


