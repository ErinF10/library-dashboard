import './App.css'
import Navbar from '../Components/Navbar'
import StatCard from '../Components/StatCard'
import React, { useEffect, useState } from "react";
import Book from '../Components/Book';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [bookData, setBookData] = useState({ 
    items: [], 
    totalItems: 0, 
    mostRecentPublishDate: null,
    cheapestBook: null 
  });
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

    useEffect(() => {
      const fetchAllBooks = async () => {
        try {
          console.log("Fetching books...");
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=fiction&key=${API_KEY}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const json = await response.json();
          const mostRecentDate = getMostRecentPublishDate(json.items);
          const cheapestBook = findCheapestBook(json.items);
    
          setBookData({
            items: json.items || [],
            totalItems: json.totalItems || 0,
            mostRecentPublishDate: mostRecentDate,
            cheapestBook: cheapestBook
          });
          setFilteredBooks(json.items || []); // Initialize filteredBooks here


          console.log("book list (fab):", bookData)
        } catch (e) {
          console.error("Error fetching books:", e);
        }
      };
      
      fetchAllBooks();
    }, []);

    const getMostRecentPublishDate = (books) => {
      return books.reduce((mostRecent, book) => {
        const publishDate = book.volumeInfo.publishedDate;
        if (!publishDate) return mostRecent;
        
        const date = new Date(publishDate);
        return date > mostRecent ? date : mostRecent;
      }, new Date(0));
    };

    const findCheapestBook = (books) => {
      return books.reduce((cheapest, book) => {
        const saleInfo = book.saleInfo;
        if (saleInfo && saleInfo.saleability === 'FOR_SALE' && saleInfo.listPrice) {
          const price = saleInfo.listPrice.amount;
          if (!cheapest || price < cheapest.price) {
            return { title: book.volumeInfo.title, price: price, currency: saleInfo.listPrice.currencyCode };
          }
        }
        return cheapest;
      }, null);
    };

    const filterBooks = () => {
      const filtered = bookData.items.filter((book) => {
        const titleMatch = book.volumeInfo.title.toLowerCase().includes(titleFilter.toLowerCase());
        const authorMatch = book.volumeInfo.authors && 
          book.volumeInfo.authors.some(author => 
            author.toLowerCase().includes(authorFilter.toLowerCase())
          );
        
        return titleMatch && (authorFilter === "" || authorMatch);
      });
      setFilteredBooks(filtered);
    };
  
    useEffect(() => {
      filterBooks();
    }, [titleFilter, authorFilter, bookData.items]);
  

  return (
    <>
      <Navbar />
      <div className='main-content'>
        <h1>Welcome to your Library Dashboard!</h1>
        <div className='stat-card-container'>
          <StatCard title='Total number of books' stat={bookData.totalItems}/>
          <StatCard title='Cheapest book' stat={bookData.cheapestBook
           ? `${bookData.cheapestBook.price + bookData.cheapestBook.currency}` : 
            'N/A'
          } />
          <StatCard title='Most recent publish date' stat={bookData.mostRecentPublishDate ? bookData.mostRecentPublishDate.toLocaleDateString() : 'N/A'}/>
        </div>

        <div className="book-list">
            <h2>Book List</h2>
            <div className="filters">
            <input
              type="text"
              placeholder="Filter by title..."
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by author..."
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
            />
          </div>
            <ul>
              {filteredBooks.map((book) => (
                <Book key={book.id} book={book} />
              ))}
          </ul>
        </div>
      </div>
      
    </>
  )
}

export default App
