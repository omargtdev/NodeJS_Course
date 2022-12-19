import { join } from "path";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const app = express();

// Variables
const { HOST, PORT } = process.env;
app.set("host", HOST);
app.set("port", PORT);

// Paths
app.set("rootPath", join(__dirname, ".."));
app.set("sourcePath", __dirname);

app.set("views", join(app.get("sourcePath"), "views")); // Views
app.use(express.static(join(app.get("rootPath"), "public"))); // Public files

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // Parse xxx-www-form-urlencoded data

// Routes
app.use(routes);

export default app;
