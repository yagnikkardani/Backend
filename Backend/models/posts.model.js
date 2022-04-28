const mongoose = require('../services/mongoose.service').mongoose;
const commentModel = require('./comments.model');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
        trim: true,
    },
    postDescription: {
        type: String,
        required: true,
        trim: true,
    },
    postDate: {
        type: Date,
        required: true
    },
    postTags: {
        type: [String],
        require: true
    },
    postLikes: {
        type: Number,
        require: false,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const postModel = mongoose.model('Post', postSchema);

exports.createPost = (postData) => {
    const post = new postModel(postData);
    return post.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        postModel.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, posts) {
                if (err) {
                    reject(err);
                } else {
                    resolve(posts);
                }
            })
    });
};

exports.findById = (id) => {
    return postModel.findById(id)
        .then((result) => {
            return result;
        });
};

exports.removeById = async (postId) => {
    const post = await postModel.findById(postId)
    const comments = post.comments
    comments.length && comments.forEach(async comment => {
        await commentModel.removeCommentById(comment)
    });
    return new Promise((resolve, reject) => {
        postModel.deleteMany({_id: postId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.patchPost = (postId, postData) => {
    return postModel.findOneAndUpdate({
        _id: postId
    }, postData);
  };