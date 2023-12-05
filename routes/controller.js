const express = require('express');
const router = express.Router();

// Define an array of routes
const routes = ['about', 'index', 'register', 'contact'];

// Loop over the routes and create a GET handler for each one
routes.forEach(route => {
  router.get(`/${route}`, function(req, res) {
    res.render(route, { loggedIn: req.session.loggedin, cartCount: req.session.cartCount || 0 });
  });
});

module.exports = router;
