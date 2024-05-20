const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose
    // .connect("mongodb://127.0.0.1:27017/chathub2")
    .connect("mongodb+srv://new-user-1:new-user-1@cluster0.emms1dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.log("Error Connecting to MongoDB: ", err);
    });
};

module.exports = connectDB;
