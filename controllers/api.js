const {
  SendChep,
  GetChep,
  isPasswordProtected,
  makeid,
} = require("../utilities/api");

//get the chep and save it in firebase firestore
const createChep = async (req, res) => {
  let chep_id = await makeid(10);
  console.log(req.body);
  if (req.body.hasOwnProperty('chep') && req.body.hasOwnProperty('is_protected')) {
      if (req.body.is_protected === true && req.body.hasOwnProperty('chep_password')) {
          SendChep(req.body.chep.toString(), chep_id.toString(), req.body.is_protected, req.body.chep_password.toString())
          res.send({ "chep_id": chep_id.toString() })
          console.log("save with password complete")
      }
      else {
          SendChep(req.body.chep.toString(), chep_id.toString(), false)
          res.send({ "chep_id": chep_id.toString() })
          console.log("save without password complete")
      }
  }
  else {
      res.status(400).send({ "error": "bad request, malformed api use, please see documentation at github to learn more" });
  }
}

//tell user about their wrong usage of sendchep. get is not supported on sendchep only post.
const createChepError = (req, res) => {
  res.send({
      "error": "post only area.",
      "documentation": 'post data in the format of {"chep":"somechep", "is_protected":false} or if you wanna add password {"chep":"somechep", "is_protected":true, "chep_password":"123456"} expect a response in {"chep_id":"your chep id"}'
  })
}

//send the chep to the user after retrieving from firebase firestore (post method for chep with passwords)
const createChepWithPassword = async (req, res) => {
  let chep_id = req.query.chep_id || null;
  console.log(chep_id);
  let getResponse;
  let getResponseTriggered = false;

  if (req.body.hasOwnProperty('chep_id')) {
      if (req.body.hasOwnProperty('chep_password')) {
          getResponse = await GetChep(req.body.chep_id, req.body.chep_password)
          getResponseTriggered = true;
      }
  }
  else if (req.body.hasOwnProperty('chep_password') && chep_id !== null) {
      getResponse = await GetChep(chep_id, req.body.chep_password)
      getResponseTriggered = true;
  }
  else if (chep_id !== null) {
      getResponse = await GetChep(chep_id);
      getResponseTriggered = true;
  }
  else {
      res.status(400).send({ "error": "bad chep id" })
  }
  if (getResponseTriggered !== false) {
      if (getResponse === 1) {
          res.status(400).send({ "error": "the chep doesn't exist. please check your chep id" })
      }
      else if (getResponse === 2) {
          res.status(400).send({ "error": "password doesn't match" })
      }
      else if (getResponse === 3) {
          res.status(400).send({
              "error": 'the chep is password protected but no password was given.',
              "documentation": 'please use post and send body {"chep_id":"your_id", "chep_password":"your password"} or have url as /getchep?chep_id="yourid" and have request as {"chep_password": "your password"}'
          })
      }
      else {
          res.send({ "chep": getResponse.chep })
      }
  }
}

//send the chep to the user after retrieving from firebase firestore (Get method for chep without passwords)
const fetchChep = async (req, res) => {
  let chep_id = req.query.chep_id || "no id"

  if (chep_id !== "no id") {
      let getResponse = await GetChep(chep_id);
      if (getResponse === 1) {
          res.status(400).send({ "error": "the chep doesn't exist. please check your chep id" })
      }
      else if (getResponse === 2) {
          res.status(400).send({ "error": "password doesn't match" })
      }
      else if (getResponse === 3) {
          res.status(400).send({
              "error": 'the chep is password protected but no password was given, and none can be given in a get request.',
              "documentation": 'please use post and send body {"chep_id":"your_id", "chep_password":"your password"} or have url as /getchep?chep_id="yourid" and have request as {"chep_password": "your password"}'
          })
      }
      else {
          res.send({ "chep": getResponse.chep })
      }
  }
  else {
      res.send({ "chepid ": chep_id })
  }
}

const checkIfPasswordProtected = async (req, res) => {
  let chep_id = req.query.chep_id || "no id"

  if (chep_id !== "no id") {
      let response = await isPasswordProtected(chep_id);
      if (response == true) {
          res.send({ "is_protected": true })
      }
      else if (response == false) {
          res.send({ "is_protected": false })
      }
      else {
          res.status(400).send({ "error": response })
      }
  }
  else {
      res.status(400).send({ "error": "no chep_id given" })
  }
}

const ApiController = {
  createChep,
  createChepWithPassword,
  createChepError,
  fetchChep,
  checkIfPasswordProtected,
};

module.exports = ApiController;
