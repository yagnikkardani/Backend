const UserModel = require('../models/users.model');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName        
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: User's First Name
 *         lastName:
 *           type: string
 *           description: User's Last Name
 *         gender:
 *           type: string
 *           description: Gender of the user
 *           enum: [Female, Male, Unknown]
 *           default: Unknown
 *       example:
 *         firstName: Yagnik
 *         lastName: Kardani
 *         gender: Male
 */

 /**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */


exports.insert = (req, res) => {
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *     responses:
 *       200:
 *         description: Delete a user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
exports.removeById = (req, res) => {
    UserModel.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({});
        });
};

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Returns a perticular user
 *     parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


exports.getById = (req, res) => {
    UserModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update a perticular user
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

exports.patchById = (req, res) => {

    UserModel.patchUser(req.params.id, req.body)
        .then((result) => {
            res.status(204).send({});
        });
  
  };