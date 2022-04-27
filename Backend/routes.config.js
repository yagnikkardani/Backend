const UsersController = require('./controllers/users.controller');
const PostsController = require('./controllers/posts.controller');
const CommentsController = require('./controllers/comments.controller');

exports.routesConfig = function (app) {
    app.post('/user', [
        UsersController.insert
    ]);
    app.get('/users', [
        UsersController.list
    ]);
    app.get('/user/:id', [
        UsersController.getById
    ]);
    app.delete('/user/:id', [
        UsersController.removeById
    ]);
    app.post('/post', [
        PostsController.insert
    ]);
    app.get('/posts', [
        PostsController.list
    ]);
    app.get('/post/:id', [
        PostsController.getById
    ]);
    app.delete('/post/:id', [
        PostsController.removeById
    ]);
    app.post('/post/:id/comment', [
        CommentsController.insert
    ]);
    app.get('/comments', [
        CommentsController.list
    ]);
    app.delete('/comment/:id', [
        CommentsController.removeById
    ]);
};