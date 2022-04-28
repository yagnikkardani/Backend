const mongoose = require('../services/mongoose.service').mongoose;

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

exports.removeById = (postId) => {
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

exports.findById = (postId) => {
    return postModel.findById(postId)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.patchPost = (postId, postData) => {
    return postModel.findOneAndUpdate({
        _id: postId
    }, postData);
  };