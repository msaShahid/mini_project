import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    _id: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password: string,
}

const userSchema = new Schema<IUser>(
    {
        name: {type: String, require : true},
        email: {type: String, require : true, unique: true},
        password: {type: String, require : true},
    },
    {
        timestamps : true
    }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


const User = mongoose.model<IUser>('User', userSchema);
export default User;