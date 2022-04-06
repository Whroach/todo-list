const sortData = ( todoList,  sort ) => {

    const sortBy = sort.slice( 0, sort.indexOf( '_' ) );
    const direction = sort.slice( sort.indexOf( '_' ) + 1, sort.length );
    todoList.sort( compareValues( sortBy, direction )  )

    return {
        todoList
    };
};


function compareValues ( key, order = 'asc' ) {
    return function innerSort ( a, b ) {
        if ( !a.hasOwnProperty( key ) || !b.hasOwnProperty( key ) ) {
            return 0;
        }
        const varA = ( typeof a[ key ] === 'string' )
            ? a[ key ].toUpperCase() : a[ key ];
        const varB = ( typeof b[ key ] === 'string' )
            ? b[ key ].toUpperCase() : b[ key ];
        let comparison = 0;
        if ( varA > varB ) {
            comparison = 1;
        } else if ( varA < varB ) {
            comparison = -1;
        }
        return (
            ( order === 'desc' ) ? ( comparison * -1 ) : comparison
        );
    };
};


const searchFilter = ( todoList, searchBy ) => {

    const { searchProperty, searchStr } = searchBy;

    const filteredResults = todoList.filter( ( e ) => {

        if ( Object.hasOwn( e, searchProperty ) ) {
            if ( e[ searchProperty ].toLowerCase().includes( searchStr.toLowerCase() ) ) {
                return e;
            }
        }

    } ); 

    return filteredResults;
}


module.exports = {
    sortData
    , searchFilter
}
