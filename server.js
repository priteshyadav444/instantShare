const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const connectDb = require('./config/dbconnection')
const file = require('./routes/file')
const path = require("path")
const cors = require('cors')
const fetchData = require('./services/removeFile')
var cron = require('node-cron');

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions))
app.use(express.static(path.join("public")))
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.json())
app.use("/", require("./routes/upload"))
app.use("/api/uploads/", file)
app.use("/files/", require("./routes/showfile"))
app.use("/files/download/", require("./routes/download"))

cron.schedule('0 0 0 * * *', () => {
    fetchData().then(() => {
        console.log("All File Removed!")
    }).catch((err) => {
        console.log("Error File Not Removed" + err)
    })
});

connectDb();
app.listen(PORT, () => {
    console.log("Server running on:" + PORT)
})