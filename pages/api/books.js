// pages/api/books.js
import connectToDatabase from "../../lib/mongodb";
import Book from "../../models/Books";

export default async function handler(req, res) {
  await connectToDatabase();
  const { method, query } = req;

  if (method === "GET") {
    try {
      const books = await Book.find({});
      // console.log("books", books);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books" });
    }
  } else if (method === "POST") {
    const { title, author, price, description, date } = req.body;
    try {
      const newBook = new Book({
        title,
        author,
        price,
        description,
        date,
      });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: "Error creating book" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
