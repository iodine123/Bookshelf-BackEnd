const { nanoid } = require('nanoid');
const book_data = require('./books')

const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  let finished = false;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  if ( pageCount === readPage ){
    finished = true;
  }
  

  const insertedBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  else {

    book_data.push(insertedBooks);
    const isSuccess = book_data.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        }
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(400);
    return response;
  }

};

const getAllBooks = (request, h) => {
  let { reading, finished, name } = request.query;

  let books = [];

  //GET reading
  if (reading !== undefined) {
    reading = parseInt(reading);

    //GET reading === 0
    if (reading === 0) {
      book_data.forEach((book) => {
        if (book.reading === false) {
          const bookItem =
          {
            'id': book.id,
            'name': book.name,
            'publisher': book.publisher,
          };
          books.push(bookItem);
        }
      });
    }

    //GET reading === 1
    else if (reading === 1) {
      book_data.forEach((book) => {
        if (book.reading === true) {
          const bookItem =
          {
            'id': book.id,
            'name': book.name,
            'publisher': book.publisher,
          };
          books.push(bookItem);
        }
      });
    }

  }

  //GET finished
  else if (finished !== undefined) {
    finished = parseInt(finished);

    //GET finished === 0
    if (finished === 0) {
      book_data.forEach((book) => {
        if (book.finished === false) {
          const bookItem =
          {
            'id': book.id,
            'name': book.name,
            'publisher': book.publisher,
          };
          books.push(bookItem);
        }
      });
    }

    //GET finished === 1
    else if (finished === 1) {
      book_data.forEach((book) => {
        if (book.finished === true) {
          const bookItem =
          {
            'id': book.id,
            'name': book.name,
            'publisher': book.publisher,
          };
          books.push(bookItem);
        }
      });
    }
  }

  //GET name
  else if (name !== undefined) {
    book_data.forEach((book) => {
      if( book.name.toLowerCase().search(name.toLowerCase()) > -1 ){
        const bookItem =
        {
          'id': book.id,
          'name': book.name,
          'publisher': book.publisher,
        }
        books.push(bookItem);
      }
    });
  }

  //GET all data
  else {
    book_data.forEach((book) => {
      const bookItem =
      {
        'id': book.id,
        'name': book.name,
        'publisher': book.publisher,
      };
      books.push(bookItem);
    });
  }



  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getBooksById = (request, h) => {
  const { bookId } = request.params;

  const bookFind = book_data.filter((n) => n.id === bookId)[0];
  if (bookFind !== undefined) {
    const book = bookFind;
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });
  response.code(404);
  return response;
};

const editBook = (request, h) => {
  const { bookId } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const bookFind = book_data.findIndex((book_data) => book_data.id === bookId);
  if (bookFind !== -1) {
    book_data[bookFind] =
    {
      ...book_data[bookFind],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const bookFind = book_data.findIndex((n) => n.id === bookId);
  if (bookFind !== -1) {
    book_data.splice(bookFind, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooks,
  getAllBooks,
  getBooksById,
  editBook,
  deleteBook,
};
