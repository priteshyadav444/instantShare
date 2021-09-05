const express = require("express")
const router = express.Router();
const File = require("../models/file")

router.get("/:uuid", async (req, res) => {
    const { uuid } = req.params;
    try {
        const file = await File.findOne({ uuid });
        if (!file) {
            return res.render("download", { error: "Something went Wrong ;(" });
        }

        return res.render("download", { uuid: file.uuid, size: file.size, filename: file.filename, link: `${process.env.BASE_URL}/files/download/${file.uuid}` })
    } catch (error) {
        return res.render("download", { error: "Something went Wrong ;(" });
    }

})
router.post("/send", async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body;

    if (!uuid || !emailTo || !emailFrom) {
        return res.status(442).send({ error: "All field required" });
    }

    const fileData = await File.findOne({ uuid });

    if (fileData.sender) {
        return res.status(442).send({ error: "Email Alredy Sent!" });
    }
    const sendMail = require("../services/emailService");
    try {
        sendMail(
            emailFrom,
            emailTo,
            "InstantShare",
            `${emailFrom} sent a file`,
            require("../services/emailTemplate")({ sender: emailFrom, downloadLink: `${process.env.BASE_URL}/files/${fileData.uuid}`, size: parseInt(fileData.size / 1000) + "KB", expires: "In 24 hour" })
        )
    } catch (error) {
        console.log("Email Sending Failed!")
    }


})
module.exports = router