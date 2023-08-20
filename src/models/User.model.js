const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  const user = this;
  //if (!user.isModified("password")) return next();
    console.log("monog",this.user)
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Method to compare a provided password with the user's hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
