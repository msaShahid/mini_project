import mongoose, {Schema} from 'mongoose'

export interface ITag {
    name: String,
    content: String,
}

const tagSchema = new mongoose.Schema<ITag> (
    {
        name: {type: String, required: true, unique: true, trim: true, maxlength: 100, minLength:10},
        content: {type: String, default: null}
    },
    {
        timestamps: true,
    }
)

const Tag = mongoose.model<ITag>('Tag', tagSchema);
export default Tag;