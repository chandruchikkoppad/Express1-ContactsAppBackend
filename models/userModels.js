const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
      username: {
            type: String,
            required: [true, "please add the username"]
      },
      email: {
            type: String,
            required: [true, "please add the Email"]
      },
      password: {
            type: String,
            required: [true, "Please add user password"]
      }
}, {
      timestamps: true
});
module.exports=mongoose.model("User",userSchema)