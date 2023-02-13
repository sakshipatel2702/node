const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
app.use(cors());
app.use(express.json());
require("./userDetails");
const jwt = require("jsonwebtoken")

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


const mongoUrl = "mongodb+srv://vedanti:1234@cluster1.imhccog.mongodb.net/React_Book"
mongoose.connect(mongoUrl, {
    useNewUrlParser:true
})
.then(() => {console.log("Connected to Book app database!!");})
.catch((e) => console.log(e))


const User=mongoose.model("User");

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

// const User=mongoose.model("UserInfo");
// app.post("/register", async(req,res) =>{
//     const{name,email,mobileNo} = req.body;
//     try{
//         await User.create({
//             uname: name,
//             email: email,
//             phoneNo: mobileNo,

//         });
//         res.send({status:"inserted"});
//     } catch (error){
//         res.send({status:"error"});
//     }
// });