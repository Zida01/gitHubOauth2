require('dotenv').config();
const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');
const router = require("express").Router();
const GitHubStrategy = require('passport-github2').Strategy;


passport.use(new GitHubStrategy({
  clientID: 'fd8f5c16380804dbb4fc',
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/github',
  passport.authenticate('github'));

  
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

module.exports = router;
