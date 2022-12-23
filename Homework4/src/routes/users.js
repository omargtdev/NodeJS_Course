import { Router } from "express";
import codes from "../doc/codes.json";

const router = Router();

const users = [];

// users/
router.get("/", (req, res, next) => {
    console.log(users);
    res.status(200).render("users", {
        pageTitle: "Users",
        path: "/users",
        users,
    });
});

// users/new
router.post("/new", (req, res, next) => {
    const { user } = req.body;

    // Check correct parameters
    if (!(user?.name && user?.lastname && user?.age))
        return res.status(400).json({
            success: false,
            reason: codes.error["101"],
        });

    const name = user.name.trim();
    if (name === "")
        return res.status(400).json({
            success: false,
            reason: {
                ...codes.error["103"],
                parameterAffected: "name",
            },
        });

    const lastname = user.lastname.trim();
    if (lastname === "")
        return res.status(400).json({
            success: false,
            reason: {
                ...codes.error["103"],
                parameterAffected: "lastname",
            },
        });

    const age = user.age.trim();
    if (age === "")
        return res.status(400).json({
            success: false,
            reason: {
                ...codes.error["103"],
                parameterAffected: "age",
            },
        });

    const ageCasted = Number(age);
    if (!Number.isInteger(ageCasted))
        return res.status(400).json({
            success: false,
            reason: {
                ...codes.error["102"],
                parameterAffected: "age",
            },
        });

    users.push({
        name,
        lastname,
        age: ageCasted,
    });

    res.status(201).json({
        success: true,
        msg: "Created!",
    });
});

export default router;
