const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await user.findOne({
      where: {
        username,
      },
    });
    const { listId } = users;

    if (!users) {
      res.status(401).send({ message: "Invalid login" });
    } else {
      bcrypt.compare(password, users.password, (err, result) => {
        if (result) {
          jwt.sign({ id: users.id }, process.env.SECRET_KEY, (err, token) => {
            const data = {
              username,
              token,
              listId,
            };
            res.status(200).send({ data });
          });
        } else {
          res.status(401).send({ message: "Invalid login" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
    console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    const saltRounds = 10;
    const { username, password } = req.body;
    const users = await user.findOne({
      where: {
        username,
      },
    });

    if (!users) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const value = {
          ...req.body,
          password: hash,
        };
        const newUser = await user.create(value);
        const { listId } = newUser;

        jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, (err, token) => {
          const data = {
            username,
            token,
            listId,
          };
          res.status(201).send({ data });
        });
      });
    } else {
      res.status(400).send({ message: "User already registered" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
    console.log(error);
  }
};