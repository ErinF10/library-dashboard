import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const [book, setBook] = useState(null);
    let params = useParams();

    useEffect(() => {
        // Fetch book details using the title
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${params.id}`);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    setBook(data.items[0]);
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [params.id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="details">
            <h1>{params.id}</h1>
            <div className="book-info-container">
                <img src={book.volumeInfo.imageLinks.thumbnail} />
                <p><strong>Description</strong>: {book.volumeInfo.description || 'No description available'}</p>
            </div>
        </div>
    );
};

export default Details;