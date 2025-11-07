import mongoose , {Schema} from 'mongoose'

export interface Icomment {
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
    content: string,
    parentComment: mongoose.Types.ObjectId | null,
}

const commentSchema = new Schema<Icomment>(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        postId: {types: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        content: {type: String, required: true, trim: true, maxLength: 1000},
        parentComment: {type: mongoose.Schema.Types.ObjectId, ref:"Comment", default: null}
    }, 
    {
        timestamps: true,
    }
)

const Comment =  mongoose.model<Icomment>('Comment', commentSchema)
export default Comment;