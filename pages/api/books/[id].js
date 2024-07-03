// pages/api/books/[id].js
import connectToDatabase from "../../../lib/mongodb";
import Book from "../../../models/Books";

export default async function handler(req, res) {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching book", error: error.message });
    }
  } else if (req.method === "PUT") {
    const { title, author, price, description, date } = req.body;
    try {
      const book = await Book.findByIdAndUpdate(
        id,
        {
          title,
          author,
          price,
          description,
          date,
        },
        { new: true }
      );
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating book", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting book", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
