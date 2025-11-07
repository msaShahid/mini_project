import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAddres {
    house: string,
    street: string,
    zip: string,
    city: string,
    state: string,
    country: string,
}

export interface IUser {
    _id: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password: string,
    image?: string
    address?: IAddres[],
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ILoginResponse {
    token: string,
    user: {
        id: string,
        name: string,
        email: string

    }
}

const userAddress = new Schema<IAddres> (
    {
        house: {type: String, trim: true},
        street: {type: String, trim: true},
        zip: {type: String, trim: true},
        city: {type: String, trim: true},
        state: {type: String, trim: true},
        country: {type: String, trim: true},
    },
    {
        _id: false 
    }
)

const userSchema = new Schema<IUser>(
    {
        name: {type: String, required : true},
        email: {type: String, required : true, unique: true},
        password: {type: String, required : true},
        image: {type: String},
        address: [userAddress]
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

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model<IUser>('User', userSchema);
export default User;