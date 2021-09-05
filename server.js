const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const connectDb = require('./config/dbconnection')
const file = require('./routes/file')
const path = require("path")
const cors = require('cors')

app.use(express.static(path.join("public")))
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.json())
app.use("/", require("./routes/upload"))
app.use("/api/uploads/", file)
app.use("/files/", require("./routes/showfile"))
app.use("/files/download/", require("./routes/download"))


const corsOption = {
    origin: process.env.ALLWOD_CLIENTS.split(",")
}

app.use(cors())

connectDb();
app.listen(PORT, () => {
    console.log("Server running on:" + PORT)
})