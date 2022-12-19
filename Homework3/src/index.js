import app from "./app";

// Start application
app.listen(app.get("port"), app.get("host"), () =>
  console.log(`Liste server on http://${app.get("host")}:${app.get("port")}`)
);
