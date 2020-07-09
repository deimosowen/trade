module.exports = app => {
    require("./companies.routes")(app);
    require("./clients.routes")(app);
    require("./routes_stage.routes")(app);
    require("./swagger.routes")(app);
}