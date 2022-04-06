const express = require( 'express' );
const todoRouter = express.Router();
const {
    getTodoListByUserIdHandler
    , postTodoTaskHandler
    , updateTodoTaskHandler
    , deleteTodoTaskHandler
} = require( '../todo/todo.ctrl' );

todoRouter.get( '/:userId', getTodoListByUserIdHandler );
todoRouter.post( '/:userId', postTodoTaskHandler );
todoRouter.put( '/:userId', updateTodoTaskHandler );
todoRouter.delete( '/:taskId', deleteTodoTaskHandler );


module.exports = todoRouter;