const express = require("express");

const app = express();

const port = process.env.PORT || 3001;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const User = require("./models/user"); // import our declared schema  from models folder
const mongoose = require("mongoose"); // import mongoose
mongoose.Promise = global.Promise; // configure mongoose promises
app.use(require("morgan")("dev"));
const mongodbAPI = "mongodb://127.0.0.1:27017/mongoexpress"; // here we declare our database URL. we can use any name after instead of "mongoexpress"  and it will automatically create database for us in that name

app.post("/adduser", (req, res) => {
  var newUser = User({
    // create a new user object and pass the formdata to the newUser . then call .save() method . it will return a promise .
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    Occupation: req.body.Occupation,
    income: req.body.income
  });

  newUser
    .save()
    .then(doc => {
      console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.get("/viewusers", (req, res) => {
  User.find({}) // find without any conditions will return all the documents in that collection
    .then(docs => {
      res.json(docs); // send documents
    })
    .catch(err => {
      res.send(err);
    });
});

app.post("/deletebyid", (req, res) => {
  User.findByIdAndDelete(req.body.userid)
    .then(result => {
      res.json({ status: "ok", result: result });
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/deletebyemail", (req, res) => {
  User.deleteOne({ email: req.body.email })
    .then(result => {
      res.json({ status: "ok", result: result });
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/updateuser", (req, res) => {
  User.findByIdAndUpdate(req.body.userid, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      Occupation: req.body.Occupation,
      income: req.body.income
    }
  })
    .then(doc => {
      res.json({ status: "ok", result: doc });
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

try {
  // here we connect with MongoDB with the url we specified earlier
  mongoose.connect(
    mongodbAPI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) console.log("connected to mongodb sucsessfully" + "👍");
      console.log(err);
    }
  );
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log("listning on " + port);
});


User.findOneAndDelete
