const commentModel = require('../models/comments.model');
exports.insert = (req, res) => {
    const postId = req.params.id;
    commentModel.createComment(req.body, postId)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    commentModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};
