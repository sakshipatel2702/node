const mongoose = require("mongoose");

const AdminDetailsSchema = new mongoose.Schema(
    {
    admin_name: String,
    admin_password: String,
},
    {
        collection: "Admin",
    }
);

mongoose.model("Admin", AdminDetailsSchema);