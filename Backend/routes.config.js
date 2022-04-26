const UsersController = require('./controllers/users.controller');
const PostsController = require('./controllers/posts.controller');
const CommentsController = require('./controllers/comments.controller');
exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/users', [
        UsersController.list
    ]);
    app.post('/posts', [
        PostsController.insert
    ]);
    app.get('/posts', [
        PostsController.list
    ]);
    app.post('/post/:id/comment', [
        CommentsController.insert
    ]);
    app.get('/comments', [
        CommentsController.list
    ]);
};