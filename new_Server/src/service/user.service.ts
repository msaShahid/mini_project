import User, { IUser } from '../models/user.model.js';

const userService = {

    async userList(): Promise<IUser[]> {
        return await User.find().select('-password -__v').sort({ createdAt: -1 });
    },

    async findUserById(id: string): Promise<IUser | null> {
        return await User.findById(id).select('-password -__v');
    },

    async findUserByEmail(email: string) : Promise<IUser | null> {
        return await User.findOne({email}).select('-password -__v');
    },

    async userCreate(data: IUser): Promise<IUser> {
        return await User.create(data);
    },

    async userUpdate(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, data, {new: true});
    },

    async userDelete(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    }

}

export default userService;