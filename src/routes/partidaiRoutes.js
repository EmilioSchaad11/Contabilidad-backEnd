
    //partidaiRoutes
    const express = require("express");
    const router = express.Router();
    const { listar, agregar, eliminar } = require("../controllers/partidaiController");


    router.get("/", listar);
    router.post("/", agregar);
    router.delete("/:id", eliminar);

    module.exports = router;
