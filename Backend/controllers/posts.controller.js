const postModel = require('../models/posts.model');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - postTitle
 *         - postDescription
 *         - postDate  
 *         - postTags      
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         postTitle:
 *           type: string
 *           description: Title of the post
 *         postDescription:
 *           type: string
 *           description: Description of the post
 *         postDate:
 *           type: string
 *           formate: date
 *           description: The Post creation date
 *         postTags:
 *           type: array
 *           description: The Post tags
 *         comments:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Comment'
 *         user:
 *           $ref:'#/components/schemas/User'
 *       example:
 *         id: 123ab45hs
 *         postTitle: My First Post
 *         postDescription: This is a post description for first post
 *         postDate: 1991-12-06T00:00:00.000Z
 *         postTags: ['Design', 'XD']
 *         comments: [234rhs45]
 *         user: 1234user001
 */

 /**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The Post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */


exports.insert = (req, res) => {
    // We can also pass current logged in id to associate it with post
    postModel.createPost(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
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
    postModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};
