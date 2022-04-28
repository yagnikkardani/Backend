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
 *         postLikes:
 *           type: integer
 *           description: Number of likes on post
 *         comments:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Comment'
 *         user:
 *           $ref:'#/components/schemas/User'
 *       example:
 *         postTitle: My First Post
 *         postDescription: This is a post description for first post
 *         postDate: 1991-12-06T00:00:00.000Z
 *         postTags: ['Design', 'XD']
 *         postLikes: 0
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



 /**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete a post
 *     parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *     responses:
 *       200:
 *         description: Delete a post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
exports.removeById = (req, res) => {
    postModel.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({});
        });
};


/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Returns a perticular post
 *     parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *     responses:
 *       200:
 *         description: The list of the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
 exports.getById = (req, res) => {
    postModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};

/**
 * @swagger
 * /post/{id}:
 *   patch:
 *     summary: Update a perticular post
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
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The Post was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */

 exports.patchById = (req, res) => {

    postModel.patchPost(req.params.id, req.body)
        .then((result) => {
            res.status(204).send({});
        });
  
  };