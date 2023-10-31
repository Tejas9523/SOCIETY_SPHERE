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
    return res.redirect('index.html');
}).listen(3000);

// Connect to the MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/mydb');
var db = monoose.connection;

// check connection
db.on('error', () => console.log("Error in connection with database"))
db.once('open', async () => {
    console.log("Connected to database");
    const usersCollection = db.collection('users');

    // sort
    const users = await usersCollection.find().sort({ 'Plot': 1 }, { 'Wing': 1 }, { 'Flat_no': 1 }).toArray();

    // Convert the users collection to a JSON file
    const jsonUsers = JSON.stringify(users);

    // Write the JSON users to a file
    fs.writeFileSync('public/users.json', jsonUsers);
})

// form post method action
app.post("/login", async (req, res) => {

    // declare variable and put html data into it
    var plot = req.body.plot_no;
    var wing = req.body.wing;
    var flat = req.body.flat_no;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var mem = req.body.no_mem;
    var type = req.body.type;
    var date = req.body.date;

    // make object
    var data = {
        "Plot": plot,
        "Wing": wing,
        "Flat": flat,
        "Name": name,
        "Email": email,
        "Phone": phone,
        "Members": mem,
        "Type": type,
        "Date": date
    }

    // insert object into collection
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record inserted successfully")
    });
    const usersCollection = db.collection('users');

    // sort
    const users = await usersCollection.find().sort({ 'Plot': 1 }, { 'Wing': 1 }, { 'Flat_no': 1 }).toArray();

    // Convert the users collection to a JSON file
    const jsonUsers = JSON.stringify(users);

    // Write the JSON users to a file
    fs.writeFileSync('public/users.json', jsonUsers);

    return res.redirect('login.html')
});

