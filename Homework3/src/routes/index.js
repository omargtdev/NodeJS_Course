import { join } from "path";

import { Router } from "express";

import app from "../app";
import usersRouter from "./users";

const router = Router();

router.use("/users", usersRouter);

// Home
router.get("/", (req, res) => {
  res.status(200).sendFile(join(app.get("views"), "index.html"));
});

// Not Found
router.use((req, res, next) => {
  res.status(404).sendFile(join(app.get("views"), "404.html"));
});

export default router;
