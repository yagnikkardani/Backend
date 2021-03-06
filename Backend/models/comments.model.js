const mongoose = require('../services/mongoose.service').mongoose;
const postModel = require('./posts.model');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentDate: {
        type: Date,
        required: true,
    },
    commentDescription: {
        type: String,
        required: true,
        trim: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

const commentModel = mongoose.model('Comment', commentSchema);

exports.createComment = async (commentData, postId) => {
    const comment = new commentModel({
        commentDescription: commentData.commentDescription,
        commentDate: commentData.commentDate,
        post: postId
    })
    await comment.save();
    const relatedPost = await postModel.findById(postId);
    relatedPost.comments.push(comment);
    return relatedPost.save()
};


exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        commentModel.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, comments) {
                if (err) {
                    reject(err);
                } else {
                    resolve(comments);
                }
            })
    });
};

exports.removeById = async (commentId) => {
    const comment = await commentModel.findById(commentId);

    // remove comments from associated post too
    const relatedPostId = comment.post
    const relatedPost = await postModel.findById(relatedPostId)
    const commentsToSave = relatedPost.comments.length > 0 ? relatedPost.comments.filter(comment => comment != commentId) : []
    relatedPost.comments = []
    commentsToSave.length && relatedPost.comments.push(commentsToSave)
    relatedPost.save()
    return new Promise((resolve, reject) => {
        commentModel.deleteMany({ _id: commentId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.removeCommentById = async (commentId) => {
    return new Promise((resolve, reject) => {
        commentModel.deleteMany({ _id: commentId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.patchComment = (commentId, commentData) => {
    return commentModel.findOneAndUpdate({
        _id: commentId
    }, commentData);
};