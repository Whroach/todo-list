const Joi = require( 'joi' );

const getTodoListSchema = Joi.object( {
    filters: Joi.object( {
        sort: Joi.string().allow( null )
        , searchProperty: Joi.string().allow( null )
        , searchStr: Joi.string().allow( null )
    } ).required()
    , userId: Joi.number().required()
} );

const createTaskSchema = Joi.object( {
    tasksToCreate: Joi.array().items(
        Joi.object().keys( {
            title: Joi.string().required()
            , description: Joi.string().allow( null )
            , status: Joi.string().allow( null )
            , dueDate: Joi.string().allow( null )
            , categoryType: Joi.string().allow( null )
        } )
    ).required()
    , userId: Joi.number().required()
} );

const updateTaskSchema = Joi.object( {
    taskId: Joi.number().required()
    , title: Joi.string().required()
    , description: Joi.string().allow( null )
    , status: Joi.string().allow( null )
    , dueDate: Joi.string().allow( null )
    , categoryType: Joi.string().allow( null )
    , userId: Joi.number().required()
} );

const deleteTaskSchema = Joi.object( {
    taskId: Joi.number().required()
} )



module.exports = {
    getTodoListSchema
    , createTaskSchema
    , updateTaskSchema
    , deleteTaskSchema
};