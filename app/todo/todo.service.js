const format = require( 'pg-format' );
const { query } = require( '../../db/index' );
const moment = require( 'moment-timezone' );

const getTodoListByUserId = async ( userId ) => {
    try {

        const text = format( `
            SELECT 
                id,
                title,
                description,
                status,
                due_date,
                category_type,
                user_id,
                created_at,
                updated_at
            FROM todo_lists
            WHERE user_id = %1$L
        `, userId );

        const todoList = await query( { text } );

        return todoList;
    } catch ( err ) {
        throw new Error( `Error retrieving todo lists - ${ err.message }` )
    }
};

const createTodoTask = async ( params, userId ) => {
    try {
        const {
            title,
            description,
            status,
            dueDate,
            categoryType
        } = params;

        const text = format( `
            INSERT INTO todo_lists (
                title,
                description,
                status,
                due_date,
                category_type,
                user_id,
                created_at
            )
            VALUES ( %1$L, %2$L, %3$L, %4$L, %5$L, %6$L, %7$L )
            RETURNING *
        `, title, description, status, dueDate, categoryType, userId, moment().utc().format() );
        //Future: Set created_at data type to DEFAULT NOW() in initial create schema

        const todoList = await query( { text } );

        return todoList;
    } catch ( err ) {
        throw new Error( `Error creating todo task - ${ err.message }` )
    }
};

const updateTodoTaskById = async ( params ) => {
    try {

        const {
            taskId,
            title,
            description,
            status,
            dueDate,
            categoryType,
        } = params;

        //Future: Replace full row update with partial
        const text = format( `
            UPDATE todo_lists
                SET title = %1$L,
                description = %2$L,
                status = %3$L,
                due_date = %4$L,
                category_type = %5$L
            WHERE id = %6$L
            RETURNING *
        `, title, description, status, dueDate, categoryType, taskId );

        const todoList = await query( { text } );

        return todoList;
    } catch ( err ) {
        throw new Error( `Error updating todo task - ${ err.message }` )
    }
};

const deleteTodoTaskById = async ( taskId ) => {
    try {
        const text = format( `
        DELETE FROM todo_lists
        WHERE id = %1$L
        `, taskId );

        await query( { text } );

        return;
    } catch ( err ) {
        throw new Error( `Error deleting todo task - ${ err.message }` )
    }
};


module.exports = {
    getTodoListByUserId
    , createTodoTask
    , updateTodoTaskById
    , deleteTodoTaskById
}
