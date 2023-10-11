const router = require("express").Router();
const Controller = require("./university.controller");

// let's check the router is in right path
// router.get("/", (req, res, next) => {
//   res.json({ data: "", msg: "Register here" });
// });

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Controller.getUniversityDetails(id);

    res.json({ data: result, msg: "Details" });
  } catch (e) {
    next(e);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const result = await Controller.createFromOne(req.body);
    res.json({ data: result, msg: "Success" });
  } catch (e) {
    next(e);
  }
});
router.put("/form-one/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updatedDocument = await Controller.updateFormOne(id, payload);
    if (!updatedDocument) {
      return res.status(404).json({ msg: "University not found " });
    }

    res.status(200).json({ data: updatedDocument, msg: "Update Success" });
  } catch (e) {
    next(e);
  }
});

router.put("/form-two/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updatedDocument = await Controller.updateFormTwo(id, payload);
    if (!updatedDocument) {
      return res.status(404).json({ msg: "University not found " });
    }

    res.status(200).json({ data: updatedDocument, msg: "Update Success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
