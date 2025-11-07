import mongoose, {Schema} from 'mongoose'

export interface ILikes {
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
}

const likesSchema = new mongoose.Schema<ILikes>(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'comment'}
    },
    {
        timestamps:true,
    }
)

const Likes = mongoose.model<ILikes>('Likes', likesSchema);
export default Likes