const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
app.use(cors());
app.use(express.json());
require("./userDetails");
require("./adminDetails");
require("./bookDetails")
const jwt = require("jsonwebtoken")

const bodyParser = require("body-parser");
app.use(bodyParser.json());


const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


const mongoUrl = "mongodb+srv://vedanti:1234@cluster1.imhccog.mongodb.net/React_Book"
mongoose.connect(mongoUrl, {
    useNewUrlParser:true
})
.then(() => {console.log("Connected to Book app database!!");})
.catch((e) => console.log(e))


const User=mongoose.model("User");
const Admin=mongoose.model("Admin");
const Book=mongoose.model("Book");


app.post("/addbook", async(req,res) =>{
  const {book_title, author_name, publish_year, book_isbn, total_edition, book_description, book_img} = req.body;
  try{
      await Book.create({
      book_title: book_title,
      author_name: author_name,
      publish_year: publish_year,
      book_isbn: book_isbn,
      total_edition: total_edition,
      book_description: book_description,
      book_img: book_img,
      });
      res.send({status:"Book Added!"}); 
     } catch (error){
      res.send({error:"Uh oh, Snap :("}); 
     }
  });


app.get("/getAllBooks", async(req, res) => {
    try{
        const allBooks=await Book.find({});
        res.json({status:"ok", data:allBooks})
    } catch (error) {
        console.log(error);
    }
  });


app.post("/deleteBook", async(req,res) =>{
    const {bookid} = req.body;
    try{
    Book.deleteOne({_id:bookid}, function (err,res){
        console.log(err);
    });
    res.send({status:"Ok", data:"Deleted the Book!"});
    } catch(error){
      console.log(error);
    }
});


app.put("/update-book/:booktitle",async(req,res) => {

  const {book_title, author_name, publish_year, book_isbn, total_edition, book_description, book_img} = req.body;
  const booktitle = req.params.booktitle
  const book = await Book.findOne({booktitle});

  if(!book){
    return res.json({error: "Book not found!"});
 }

  try{

    if (book_title !== undefined)

      book.book_title = book_title;

    if (author_name !== undefined)

      book.author_name = author_name;

    if (publish_year !== undefined)

      book.publish_year = publish_year;

    if (book_isbn !== undefined)

      book.book_isbn = book_isbn;

    if (total_edition !== undefined)

      book.total_edition = total_edition;

    if (book_description !== undefined)

      book.book_description = book_description;

    if (book_img !== undefined)

      book.book_img = book_img;

    await book.save();

    res.send({status:"Update successful"}); 

 } catch (error){

  res.send({error:"update failed"}); 

 }

});


app.get("/getAllUser", async(req, res) => {
    try{
        const allUser=await User.find({});
        res.send({status:"ok", data:allUser})
    } catch (error) {
        console.log(error);
    }
  });


app.post("/register", async(req,res) =>{
const {username,password,contact,birthdate} = req.body;
const encryptedPass = await bcrypt.hash(password,10);
try{
    //const oldUser = await User.findOne((email));

    // if(oldUser){
    //    return res.send({error: "User Name already taken!"})
    // }
    await User.create({
    username: username,
    password: encryptedPass,
    contact: contact,
    birthdate: birthdate,
    });
    res.send({status:"Bookworm Signed Up!"}); 
   } catch (error){
    res.send({error:"Uh oh, Snap :("}); 
   }
});



app.put("/update-user/:username",async(req,res) => {

   const {password,contact,birthdate} = req.body;

   let encryptedPass = undefined

   if (password !== undefined) {

     encryptedPass = await bcrypt.hash(password,10);

  }

   const username = req.params.username

   const user = await User.findOne({username});



   if(!user){

     return res.json({error: "User not found!"});

  }

   try{

     if (password !== undefined)

       user.password = encryptedPass;

     if (contact !== undefined)

       user.contact = contact;

     if (birthdate !== undefined)

       user.birthdate = birthdate;

     await user.save();

     res.send({status:"Update successful"}); 

  } catch (error){

   res.send({error:"update failed"}); 

  }

});



app.post("/login-user",async(req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});

    if(!user){
        return res.json({error: "User not found!"});
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({}, JWT_SECRET);

        if(res.status(201)){
            return res.json({status:"Bookworm Signed Up!", data: token});
        }else{
            return res.json({error:"Uh oh, Snap :("});
        }
    }
    res.json({status:"error", error:"Invalid Password"});
});


app.post("/deleteUser", async(req,res) =>{
    const {userid} = req.body;
    try{
    User.deleteOne({_id:userid}, function (err,res){
        console.log(err);
    });
    res.send({status:"Ok", data:"Deleted the User!"});
    } catch(error){
      console.log(error);
    }
});


app.post('/login-admin', (req, res) => {
    const { admin_name, admin_password } = req.body;
  
    Admin.findOne({ admin_name, admin_password }, (err, user) => {
      if (err) {
        res.status(500).json('An error occurred while logging in.');
      } else if (!user) {
        res.status(401).json('Invalid email or password.');
      } else {
        res.json('Login successful.');
      }
    });
  });



app.listen(5000,() => {
    console.log("Server Started");
})

// app.post("/post", async(req,res) => {
//     console.log(req.body);
//     const {data} = req.body;

//     try{
//         if(data=="sakshi"){
//             res.send({status:"ok"})
//         } else {
//             res.send({status: "User not found!"})
//         }

//     } catch (error){
//         res.send({status:"Something went wrong try again!"})
//     }
// });