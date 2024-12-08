const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmpassword: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true, //creteadAt & updatedAt
  }
);
const User = model("User", userSchema);

module.exports =User
