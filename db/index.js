const { Pool } = require( 'pg' );
const _ = require( 'lodash' ); 

const credentials = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
};


const query = async params => {
    try {
        const { text } = params;
        const pool = new Pool( credentials );
        const data = await pool.query( text );
        //Convert columns to camelCase
        let result = data.rows.map( el => _.mapKeys( el, ( val, key ) => _.camelCase( key ) ) );
        return result;
    } catch ( err ) {
        throw new Error( `Error connecting to database - ${ err.message  }` )
    }
};

module.exports = { query };