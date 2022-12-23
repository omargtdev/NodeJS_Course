import { Router } from "express";

import usersRoutes from "./users";

const router = Router();

router.use("/users", usersRoutes);

// Home
router.get("/", (req, res) => {
    res.status(200).render("home", {
        pageTitle: "Home",
        path: "/",
    }); // user form
});

// Not Found
router.use((req, res, next) => {
    res.status(404).render("404");
});

export default router;
