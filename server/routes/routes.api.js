const router = require("express").Router();
const apiUniversity = require("../modules/universities/university.route");

//let's check the router is in right path
// router.get("/", (req, res, next) => {
//   res.json({ data: "", msg: "API router" });
// });

router.use("/universities", apiUniversity);

//Check the undefined router
router.all("*", () => {
  try {
    res.json({ data: "", msg: "Router are not defined" });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
