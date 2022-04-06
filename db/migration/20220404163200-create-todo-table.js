/*
DB Migration file is static and does not run but created it as an example of how I would integrate version control
for new schemas and changes to existing queries
*/

module.exports = {
    up: ( queryInterface, Sequelize ) => {
        return queryInterface.sequelize.query( `
            CREATE TABLE todo_lists (
                id SERIAL PRIMARY KEY,
                title TEXT,
                description TEXT,
                status TEXT,
                due_date TIMESTAMP WITH TIME ZONE,
                category_type TEXT,
                user_id INT,
                created_at TIMESTAMP WITH TIME ZONE, 
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        ` );
    }
    , down: ( queryInterface, Sequelize ) => {
        return queryInterface.sequelize.query( `
            DROP TABLE IF EXISTS todo_lists;
        ` );
    }
};