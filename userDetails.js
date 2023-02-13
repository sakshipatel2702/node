const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
    username: String,
    password: String,
    contact: String,
    birthdate: String,
    //email: String,
},
    {
        collection: "User",
        //collection: "UserInfo",
    }
);

mongoose.model("User", UserDetailsSchema);
//mongoose.model("UserInfo", UserDetailsSchema);