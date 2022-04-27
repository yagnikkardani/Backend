const commentModel = require('../models/comments.model');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - commentDescription
 *         - commentDate        
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         commentDescription:
 *           type: string
 *           description: The description of the comment
 *         commentDate:
 *           type: string
 *           formate: date
 *           description: Date of the comment
 *         post:
 *           $ref: '#/components/schemas/Post'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         parentComment:
 *           $ref: '#/components/schemas/Comment'
 *       example:
 *         id: 123ab45hs
 *         commentDescription: This is my first comment
 *         commentDate: 1991-12-06T00:00:00.000Z
 *         post: 123ab45xx
 *         user: 123ab45yy
 *         parentComment: 123ab45zz
 */

 /**
 * @swagger
 * /post/{id}/comment:
 *   post:
 *     summary: Create a new comment
 *     parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The Comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */


exports.insert = (req, res) => {
    const postId = req.params.id;
    commentModel.createComment(req.body, postId)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Returns the list of all the comments
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

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
