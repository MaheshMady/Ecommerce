const express = require("express");
const { checktoken } = require("../Middlewares/jwt");
const { validatelogin, validateemployee } = require("../Middlewares/joi");
const {
  login,
  addemployee,
  deleteemployee,
  getemployee,
  dispemployee,
  updateproduct,
  getorders,
  updatestatus
} = require("../Controller/admincontrols");
const uploads = require("../Middlewares/multer");

const router = express.Router();

router.post("/login", validatelogin, login);
router.post(
  "/addemployee",
  checktoken,
  uploads.single("image"),
  validateemployee,
  addemployee
);
router.delete("/employee/:id", checktoken, deleteemployee);
router.get("/employee/:id", getemployee);
router.get("/employees", dispemployee);
router.put("/updateproduct/:id",checktoken, uploads.single("image") ,validateemployee,updateproduct)
router.get("/adminorders",checktoken,getorders)
router.patch("/updatestatus/:id",checktoken,updatestatus)

module.exports = router;
