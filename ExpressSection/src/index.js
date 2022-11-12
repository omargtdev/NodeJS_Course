import app from "./app";

// Start application
app.listen(app.get('port'), app.get('host'), () => console.log(`Server called ${app.get('host')} listen on port ${app.get('port')}`));