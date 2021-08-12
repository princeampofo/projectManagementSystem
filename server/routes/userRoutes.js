const express = require("express");
const router = express.Router();
const routesFunction = require("./controllers/routeFunctions");

// routes
router.get("/", routesFunction.view); // view landing page
router.post("/", routesFunction.search); //search for project
router.get("/addproject", routesFunction.addPage); // redirect to add project page
router.post("/addproject", routesFunction.add); // add project
router.get("/editproject/:id", routesFunction.editPage); // edit project page
router.post("/editproject/:id", routesFunction.update); // update project
router.get("/viewproject/:id", routesFunction.viewOne); // view a project
router.get("/:id", routesFunction.delete); // delete a project

module.exports = router;
