module.exports = app => {
    require("./companies.routes")(app);
    require("./routes_stage.routes")(app);
    require("./swagger.routes")(app);
}