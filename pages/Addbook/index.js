import { useState } from "react";
import axios from "axios";
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

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, price, description, date };
    try {
      const response = await axios.post("/api/books", newBook);
      console.log("Book added:", response.data);
      // Reset form
      setTitle("");
      setAuthor("");
      setPrice("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <Container>
        <Title>Add a New Book</Title>
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
          <Button type="submit">Add Book</Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddBook;
