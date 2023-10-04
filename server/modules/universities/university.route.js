const router = require("express").Router();
const Controller = require("./university.controller");

// let's check the router is in right path
// router.get("/", (req, res, next) => {
//   res.json({ data: "", msg: "Register here" });
// });

router.post("/register", async (req, res, next) => {
  try {
    const result = await Controller.create(req.body);
    res.json({ data: result, msg: "Success" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Controller.getDetails(id);

    res.json({ data: result, msg: "Details" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
