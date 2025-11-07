import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const authheader = req.headers.authorization;

        if (!authheader || !authheader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not authorized, no token' })
        }
        const token = authheader.split(' ')[1]!;

        const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
        (req as any).user = decoded;

        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({
            message: 'Not Authorized, token failed.',
        })
    }
}

export default authMiddleware;