const express = require("express");
const router = express.Router();
const routesFunction = require("./controllers/routeFunctions");

// routes
router.get("/", routesFunction.view);
router.post("/", routesFunction.search);
router.get("/addproject", routesFunction.addPage);
router.post("/addproject", routesFunction.add);
router.get("/editproject/:id", routesFunction.editPage);
router.post("/editproject/:id", routesFunction.update);
router.get("/viewproject/:id", routesFunction.viewOne);
router.get("/:id", routesFunction.delete);

module.exports = router;
