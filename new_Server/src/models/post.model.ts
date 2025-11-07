import mongoose, {Schema} from 'mongoose'

export interface IPost {
    userId: mongoose.Types.ObjectId,
    name: String,
    description: String,
    images? : String[],
    tag: mongoose.Types.ObjectId[],
    likesCount: Number,
    status: String
}

const postSchema = new Schema<IPost>(
    {
        userId : {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        name: {type: String, required: true},
        description:  {type: String, required: true, maxLength: 500},
        images: [{type: String}],
        tag: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
        likesCount: {type: Number, default: 0},
        status: {type: String}
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;