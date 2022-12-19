import { join } from "path";

import { Router } from "express";

import app from "../app";

const router = Router();

// users/
router.get("/", (req, res, next) => {
  res.status(200).sendFile(join(app.get("views"), "users.html"));
});

export default router;
