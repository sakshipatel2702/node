const mongoose = require("mongoose");

const BookDetailsSchema = new mongoose.Schema(
    {
    book_title: String,
    author_name: String,
    publish_year: String,
    book_isbn: String,
    total_edition: String,
    book_description: String,
    book_img: String,
    //genre: Array,
},
    {
        collection: "Book",
    }
);

mongoose.model("Book", BookDetailsSchema);