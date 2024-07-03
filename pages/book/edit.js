import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
  &:focus {
    border-color: #0070f3;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
  &:focus {
    border-color: #0070f3;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

const EditBook = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`/api/books/${id}`);
          const book = response.data;
          setTitle(book.title);
          setAuthor(book.author);
          setPrice(book.price);
          setDescription(book.description);
          setDate(book.date.split("T")[0]); // Format date for input
        } catch (error) {
          console.error("Error fetching book:", error);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = { title, author, price, description, date };
    try {
      const response = await axios.put(`/api/books/${id}`, updatedBook);
      console.log("Book updated:", response.data);
      router.push(`/book/${id}`);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      <Container>
        <Title>Edit Book</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Title:</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Author:</Label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Price:</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Description:</Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Date:</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Update Book</Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditBook;
