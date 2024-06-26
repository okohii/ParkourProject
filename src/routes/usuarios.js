var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/home", function (req, res) {
    res.render("home");
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/votar", function (req, res) {
    usuarioController.votar(req, res);
});

router.get("/selectClassic", function (req, res) {
    usuarioController.selectClassic(req, res);
});

router.get("/selectFreeRunning", function (req, res) {
    usuarioController.selectFreeRunning(req, res);
});

router.get("/selectClimbing", function (req, res) {
    usuarioController.selectClimbing(req, res);
});
  

module.exports = router;