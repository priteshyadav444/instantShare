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


const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
    // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}
app.use(cors(corsOptions))

connectDb();
app.listen(PORT, () => {
    console.log("Server running on:" + PORT)
})