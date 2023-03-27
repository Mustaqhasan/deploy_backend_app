const {UserModal} = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    const user = await UserModal.findOne({ email });
    if (user) {
      return res.status(200).send({ msg: "User already exist, please login" });
    }
    bcrypt.hash(password, 3, async (err, hash) => {
      const newUser = new UserModal({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await newUser.save()
      res.status(200).send({ msg: "A new User has been created" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModal.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({'msg':"login Succussfull","token":jwt.sign({"userID":user._id},"masai")})
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
};
