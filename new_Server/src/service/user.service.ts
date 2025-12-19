import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser, ILoginResponse } from '../models/user.model.js';
import userCache from "../cache/userCache.js";
import { logger } from '../utils/logger.js';

const USER_PROJECTION = "-password -__v";

function generateToken(user: IUser): string {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT secret key is missing. Please set JWT_SECRET environment variable.");
    }
    return jwt.sign(
        { id: user._id.toString(), name: user.name, email: user.email },
        secretKey,
        { expiresIn: "1h" }
    );
}

const userService = {

    async userList(): Promise<IUser[]> {

        try {
            const cached = await userCache.getUserList();
            if (cached?.data) {
                logger.info("User List → Cache HIT");
                return cached.data;
            }

            logger.info("User List → Cache MISS, fetching from DB");

            const users = await User.find()
                .select(USER_PROJECTION)
                .sort({ createdAt: -1 });

            // Store to Redis
            await userCache.saveUserList(users);

            return users;
        } catch (err) {
            logger.warn("Redis unavailable, fetching users from DB", err);
            return User.find().select(USER_PROJECTION).sort({ createdAt: -1 });
        }
    },

    async findUserById(id: string): Promise<IUser | null> {
        try {
            const cached = await userCache.getUserDetails(id);
            if (cached?.data) {
                logger.info(`User ${id} → Cache HIT`);
                return cached.data;
            }

            const user = await User.findById(id).select(USER_PROJECTION);

            if (user) {
                await userCache.saveUserDetails(id, user.toObject());
            }

            return user;
        } catch (err) {
            logger.warn(`Redis unavailable, fetching user ${id} from DB`, err);
            return User.findById(id).select(USER_PROJECTION);
        }
    },

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select(USER_PROJECTION);
    },

    async userRegister(data: IUser): Promise<IUser> {
        const user = await User.create(data);

        try {
            await userCache.invalidateUser();
        } catch (err) {
            logger.warn("Redis invalidate failed on user register", err);
        }

        return user;
    },

    async userUpdate(id: string, data: Partial<IUser>): Promise<IUser | null> {
        const user = await User.findByIdAndUpdate(id, data, { new: true, }).select(USER_PROJECTION);

        if (user) {
            try {
                await userCache.invalidateUser(id);
            } catch (err) {
                logger.warn(`Redis invalidate failed for user ${id}`, err);
            }
        }

        return user;
    },

    async userDelete(id: string): Promise<IUser | null> {
        const deleted = await User.findByIdAndDelete(id);

        if (deleted) {
            try {
                await userCache.invalidateUser(id);
            } catch (err) {
                logger.warn(`Redis invalidate failed for user ${id}`, err);
            }
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