/** @format */

const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");


router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    //res.redirect("/");
    console.log("Logout");
  });
});

router.post("/signup", (req, res) => {
  const { fullname, username, number, password } = req.body;
  console.log(fullname, username, number, password);
  if (!(fullname && username && number && password)) {
    return res.status(400).json({ error: "Inputs are required" });
  }
  const newUser = new User({
    username: username,
    fullname: fullname,
    phonenumber: number,
  });
  User.register(newUser, password, (err, user) => {
    if (err) {
      res.status(401).json({ error: "User already exist" });
      console.log("User already exist");
      //res.redirect("/signup");
    } else {
      passport.authenticate("local")(req, res, () => {
        //res.redirect("/success");
        //res.send(user);
        res.status(200).json({ success: "Signup Succesffuly" });
        console.log("Signup Successfully");
      });
    }
  });
});

router.post("/login", (req, res) => {
  if (!(req.body.username && req.body.password)) {
    res.status(400).json({ error: "All inputs are required" });
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        //res.send(req.user.username);
        res.status(200).json({ success: "Login Successfully" });
      });
    }
  });
});

router.get("/findUser", (req, res) => {
  User.find({}, (err, user) => {
    if (!err) {
      return res.send(user);
    } else {
      console.log(err);
    }
  });
});

router.get("/authenticate", (req, res) => {
  if (req.isAuthenticated()) {
    // res.status(200).json({
    // authenticated: true
    // });
    res.json(req.user);
    console.log("Authenticated");
  } else {
    console.log("Not Authenticated");
  }
});

module.exports = router;
