const express = require('express');
const app = express();

app.use(express.json());

const db = require("./models");

// Routers
const groupRouter = require("./routes/Groups");
app.use("/groups", groupRouter);

db.sequelize.sync().then(() => {
    app.listen(8081, () => {
        console.log('Server running on port 8001');
    });
})