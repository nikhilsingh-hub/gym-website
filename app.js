const express=require("express");
const app=express();
const fs=require("fs");
const path = require('path');
const port = 80;

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/GymMembersApplication');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const gymSchema = new mongoose.Schema({
    name: String,
    age: Number,
    number: String,
    address: String
  });

const gym = mongoose.model('Gym', gymSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

// app.set('view engine', 'html')
// app.set('views', path.join(__dirname, 'views')) 

app.get("/", (req, res)=>{ 
    const params = {};
    res.sendFile(path.join(__dirname, 'views', 'home.html'),params);
});

app.get("/contact.html", (req, res)=>{ 
    const params = {};
        res.sendFile(path.join(__dirname, 'views', 'contact.html'),params);
});

app.post("/contact.html", (req, res)=>{ 
    var myData = new gym(req.body);
    myData.save().then(function (){
        res.send("This item is saved");
    })
    .catch(function (){
        res.status(400).send("NOT SAVED ERROR!!!!!!!");
    });
    // await myData.save("saved");
    // res.status(200).render('contact.pug',params);
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);

});