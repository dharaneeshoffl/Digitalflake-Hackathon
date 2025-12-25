import express from "express";
import upload from "../middleware/upload.js";
import * as ctrl from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), ctrl.create);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.put("/:id", upload.single("image"), ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
