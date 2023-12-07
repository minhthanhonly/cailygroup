const express = require('express');
const app = express();

app.use(express.json());

const db = require("./models");

// Routers
// const groupRouter = require("./routes/Groups");
// app.use("/groups", groupRouter);

// Xóa bảng và toàn bộ dữ liệu



app.listen(8081, () => {
    console.log('Server running on port 8001');
});

// db.sequelize.sync().then(() => {
    
// })