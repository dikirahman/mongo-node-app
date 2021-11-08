const mongoose = require("mongoose"); //import mongoose

var Schema = mongoose.Schema; // declare a new schema

var userSchema = new Schema({
  email: {
                 // here we are adding attributes to our declared schema                
   type:String,  // in the options we have to give the type. and will can 
   unique: true  // also add additional options, since email is unique we
                 // will create it as unique.
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  address: {
    type: String
  },
  Occupation: {
    type: String
  },
  income: {
    type: Number
  }
});

const User = mongoose.model("User", userSchema); // now we have to create our model 

module.exports = User;  // export our created model
