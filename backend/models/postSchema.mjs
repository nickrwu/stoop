import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   meta: {
//     likes: Number,
//     favs: Number
//   },
//   taken: Boolean
});

const Post = mongoose.model('Post', postSchema);

export default Post;
