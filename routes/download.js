const express = require("express")
const router = express.Router();
const File = require("../models/file")
const path = require("path")
router.get("/:uuid", async (req, res) => {

    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
        return res.render("download", { error: "Something went Wrong;)" })
    }
    const filepath = `${__dirname}/../${file.path}`
    console.log(req.method + "  " + path.extname(filepath) + "  " + file.size)
    res.download(filepath)
})

module.exports = router