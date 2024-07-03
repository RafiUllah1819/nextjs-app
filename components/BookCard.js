import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  width: 250px;
`;

const BookCard = ({ book }) => {
  return (
    <Card>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <Link href={`/book/${book._id}`}>View Details</Link>
    </Card>
  );
};

export default BookCard;
