const express = require("express");
const ApiController = require("../controllers/api");
const apiRouter = express.Router();

apiRouter
  .post("/sendchep", ApiController.createChep)
  .get("/sendchep", ApiController.createChepError)
  .post("/getchep", ApiController.createChepWithPassword)
  .get("/getchep", ApiController.fetchChep)
  .get("/ispasswordprotected", ApiController.checkIfPasswordProtected);

module.exports = apiRouter;
