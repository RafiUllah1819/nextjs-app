import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const BackLink = styled.a`
  display: inline-block;
  margin-bottom: 20px;
  color: #0070f3;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const EditLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  color: #0070f3;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  display: inline-block;
  margin-top: 20px;
  color: #fff;
  background-color: #ff0000;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

const BookDetails = ({ book }) => {
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${id}`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (!book) return <p>Loading...</p>;

  if (!book.title)
    return (
      <div>
        <Container>
          <Link href="/Booklist" passHref>
            <BackLink>← Back to Home</BackLink>
          </Link>
          <Title>Book Not Found</Title>
          <p>Sorry, the book you are looking for does not exist.</p>
        </Container>
      </div>
    );

  return (
    <div>
      <Container>
        <Link href="/Booklist" passHref>
          <BackLink>← Back to Home</BackLink>
        </Link>
        <Title>{book.title}</Title>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <p>
          <strong>Price:</strong> ${book.price}
        </p>
        <p>
          <strong>Date:</strong> {new Date(book.date).toDateString()}
        </p>
        <Link href={`/book/edit?id=${book._id}`} passHref>
          <EditLink>Edit Book</EditLink>
        </Link>
        <DeleteButton onClick={handleDelete}>Delete Book</DeleteButton>
      </Container>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/books/${params.id}`
    );
    const book = response.data;
    // console.log("single", book);
    return { props: { book } };
  } catch (error) {
    console.error("Error fetching book:", error);
    return { props: { book: null } };
  }
}

export default BookDetails;
