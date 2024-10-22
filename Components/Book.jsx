import React from "react";

function Book({ book }) {
    return (
      <div>
        <h2>{book.volumeInfo.title}</h2>
        <div className="book-info-container">
            
            <img src={book.volumeInfo.imageLinks.thumbnail} />
            <div>
                <p><strong>Author:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <p><strong>Published</strong>: {book.volumeInfo.publishedDate || 'Unknown'}</p>
                <p><strong>Description</strong>: {book.volumeInfo.description || 'No description'}</p>
            </div>
            
        </div>
      </div>
    );
  }

export default Book;