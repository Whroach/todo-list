const { 
    getTodoListByUserId
    , createTodoTask
    , updateTodoTaskById
    , deleteTodoTaskById
} = require( '../todo/todo.service' )
const { 
    createTaskSchema
    , getTodoListSchema
    , updateTaskSchema
    , deleteTaskSchema
 }= require( '../todo/todo.validation' );
const { sortData, searchFilter } = require( '../todo/todo.helper' );


const getTodoListByUserIdHandler = async ( req, res ) => {
    try {
        const { userId } = req.params;
        const { filters } = req.body;
        req.body.userId = userId;

        const validatedData = await getTodoListSchema.validateAsync( req.body );
        if ( validatedData.error ) {
            throw new Error( `Unable to validate getTodoListSchema data - ${ validatedData.error } ` );
        }

        let results = await getTodoListByUserId( userId )

        if ( filters.searchProperty ) {
            results = searchFilter( results, {
                searchProperty: filters.searchProperty
                , searchStr: filters.searchStr
            }  );
        }

        //Default sort to sort final data by dueDate in ascending order
        results = sortData( results , filters.sort || 'dueDate_asc' )

        return res.status( 200 ).json( results );
    } catch ( error ) {
        throw new Error( `Error retrieving todo list request - ${ error.message } ` )
    }
};

const postTodoTaskHandler = async ( req, res ) => {
    try {
        const { userId } = req.params;
        req.body.userId = userId;

        const validatedData = await createTaskSchema.validateAsync( req.body );

        if ( validatedData.error ) {
            throw new Error( `Unable to validate createTaskSchema data - ${ validatedData.error } ` );
        }


        /*
            NOW - Bulk create functionality 
            FUTURE - Create a bulk create service function in Postgres
        */
        const results = []
        for ( const element of req.body.tasksToCreate ) { {
            const [ data ]  = await createTodoTask( element, userId );
            results.push( data );
        }

        }
        return res.status( 201 ).json( results );
    } catch ( error ) {
        throw new Error( `Error processing new todo task request - ${ error.message } ` )
    }
};

const updateTodoTaskHandler = async ( req, res ) => {
    try {
        const { userId } = req.params;
        req.body.userId = userId;

        const validatedData = await updateTaskSchema.validateAsync( req.body );
        if ( validatedData.error ) {
            throw new Error( `Unable to validate updateTaskSchema data - ${ validatedData.error } ` );
        }

        const results = await updateTodoTaskById( req.body )
        return res.status( 201 ).json( results );
    } catch ( error ) {
        throw new Error( `Error processing update todo task request - ${ error.message } ` )
    }
};

const deleteTodoTaskHandler = async ( req, res ) => {
    try {
        const { taskId } = req.params;

        const validatedData = await deleteTaskSchema.validateAsync( { taskId } );
        if ( validatedData.error ) {
            throw new Error( `Unable to validate deleteTaskSchema data - ${ validatedData.error } ` );
        }

        await deleteTodoTaskById( taskId )

        //Return a confirmation message but would usually return a 204 with no content.
        return res.status( 201 ).send( 'Successfully deleted task item' );
    } catch ( error ) {
        throw new Error( `Error processing update todo task request - ${ error.message } ` )
    }
};



module.exports = {
    getTodoListByUserIdHandler
    , postTodoTaskHandler
    , updateTodoTaskHandler
    , deleteTodoTaskHandler
}