const { sortData, searchFilter } = require( '../todo/todo.helper' );

test('sorts data in ascending order', () => {

    const data = [ 
        {
            date: "2022-04-02"
        },             
        {
            date: "2022-04-03"
        }, 
        {
            date: "2022-04-01"
        }
     ]

    expect( sortData( data, 'date_asc' ).todoList ).toStrictEqual( data.sort() );

  });


test('search todo list by title ', () => {

const data = [ 
    {
        title: "Build a data compression algorithm"
    },             
    {
        title: "Pair Programming session with Lead"
    }, 
    {
        title: "Eat Lunch"
    }
    ]

expect( searchFilter( data, 'COMPRESSION' ).length ).toBe( 1 );

});