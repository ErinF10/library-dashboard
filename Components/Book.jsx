import React from "react";
import { Link } from "react-router-dom";

function Book({ book }) {
    return (
      <div>
        <h2>{book.volumeInfo.title}</h2>
        <div className="book-info-container">
            
            <img src={book.volumeInfo.imageLinks.thumbnail} />
            <div>
                <p><strong>Author:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <p><strong>Published</strong>: {book.volumeInfo.publishedDate || 'Unknown'}</p>
                <Link to={`/details/${book.volumeInfo.title}`}>Click here for more details</Link>
            </div>
            
        </div>
      </div>
    );
  }

export default Book;