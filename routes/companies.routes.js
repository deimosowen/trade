module.exports = app => {
    const companies = require("../controllers/companies.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", companies.findAll);
  
    app.use('/api/companies', router);
  };