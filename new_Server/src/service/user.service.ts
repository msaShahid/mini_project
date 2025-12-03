import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser, ILoginResponse } from '../models/user.model.js';
import userCache from '../cache/userCache.js';

const USER_PROJECTION = "-password -__v";

function generateToken(user: IUser): string {
    return jwt.sign(
        { id: user._id.toString(), name: user.name, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );
}

const userService = {

    async userList(): Promise<IUser[]> {

        // Try redis cache
        const cached = await userCache.getUserList();
        if (cached?.data) {
            return cached.data;
        }

        console.log("User List → Cache MISS, fetching from DB");

        // DB query
        const users = await User.find().select(USER_PROJECTION).sort({ createdAt: -1 });

        // Store to Redis
        await userCache.saveUserList(users);

        return users;
    },

    async findUserById(id: string): Promise<IUser | null> {
        const cached = await userCache.getUserDetails(id);
        if (cached?.data) {
            return cached.data;
        }

        const user = await User.findById(id).select(USER_PROJECTION);
        if (user) {
            await userCache.saveUserDetails(id, user.toObject());
        }

        return user
    },

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select(USER_PROJECTION);
    },

    async userRegister(data: IUser): Promise<IUser> {
        const user = await User.create(data);

        //  Invalidate only the user list
        await userCache.invalidateUser();

        return user;
    },

    async userUpdate(id: string, data: Partial<IUser>): Promise<IUser | null> {
        const user = await User.findByIdAndUpdate(id, data, { new: true }).select(USER_PROJECTION);

        if (user) {
            // Invalidate both list and user details cache
            await userCache.invalidateUser(id);
        }

        return user;
    },

    async userDelete(id: string): Promise<IUser | null> {
        const deleted = await User.findByIdAndDelete(id);

        if (deleted) {
            // Remove both the list and this user's cached data
            await userCache.invalidateUser(id);
        }

        return deleted;
    },

    async userLogin(email: string, password: string): Promise<ILoginResponse | null> {
        const user = await User.findOne({ email });
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const token = generateToken(user);

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