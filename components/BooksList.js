import React from "react";
import BookCard from "./BookCard";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BooksList = ({ books }) => {
  if (!books.length) {
    return <h1>No books Available</h1>;
  }
  return (
    <List>
      {books.map((book, i) => (
        <BookCard key={book._id} book={book} />
      ))}
    </List>
  );
};

export default BooksList;
