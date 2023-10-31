// import all required libraries and modules
const express = require('express');
const bodyparser = require('body-parser')
const monoose = require('mongoose');
const { default: mongoose } = require('mongoose');
const fs = require('fs');
const app = express();

// use that modules in our app
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended: true
}))

// allocate port number and redirect
app.get("/", async (req, res) => {
    res.set({
        "Allow-acess-Allow-Origin": "*"
    })
    return res.redirect('data.html');
}).listen(8080);

// Connect to the MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/mydb');
var db = monoose.connection;


// form post method action
app.post("/del", async (req, res) => {

    var inputValue = req.body.no;

    // Delete the first document that matches the given filter
    const deleteResult = await db.collection('users').deleteOne({ Phone: inputValue });

    // Check if the deletion was successful
    if (deleteResult.deletedCount > 0) {
        console.log('Document deleted successfully.');
    } else {
        console.log('No document matched the given filter.');
    }

    // Get the path to the JSON file
    const filePath = "public/users.json";

    // Delete the JSON file
    fs.unlinkSync(filePath);

    // sort
    const users = await db.collection('users').find().sort({ 'Plot': 1 }, { 'Wing': 1 }, { 'Flat_no': 1 }).toArray();

    // Convert the users collection to a JSON file
    const jsonUsers = JSON.stringify(users);

    // Write the JSON users to a file
    fs.writeFileSync(filePath, jsonUsers);
    return res.redirect('data.html')
});

