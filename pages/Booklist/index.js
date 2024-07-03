import React from "react";
import axios from "axios";
import BooksList from "../../components/BooksList";

export async function getStaticProps() {
  let books = [];
  try {
    const response = await axios.get("http://localhost:3000/api/books");
    books = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  // console.log("books", books);
  return {
    props: { books }, // will be passed to the page component as props
    revalidate: 10, // re-generate the page every 10 seconds
  };
}

const BookList = ({ books }) => {
  // console.log("bookss", books);
  return (
    <div>
      <h1>Available all Books</h1>
      <BooksList books={books} />
    </div>
  );
};

export default BookList;
