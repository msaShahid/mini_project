import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser, ILoginResponse } from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET!;

const userService = {

    async userList(): Promise<IUser[]> {
        return await User.find().select('-password -__v').sort({ createdAt: -1 });
    },

    async findUserById(id: string): Promise<IUser | null> {
        return await User.findById(id).select('-password -__v');
    },

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select('-password -__v');
    },

    async userRegiter(data: IUser): Promise<IUser> {
        return await User.create(data);
    },

    async userUpdate(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, data, { new: true });
    },

    async userDelete(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    },

    async userLogin(email: string, password: string): Promise<ILoginResponse | null> {
        const user = await User.findOne({ email })
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,

            }
        }
    }
}

export default userService;