const { addBooks,
        getAllBooks,
        getBooksById,
        editBook,
        deleteBook,
  } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;