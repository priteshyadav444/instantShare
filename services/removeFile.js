const File = require("../models/file")
const fs = require('fs');

const fetchData = async () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const files = await File.find({ $lt: date });

    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log("File Removed : " + file.filename);

            } catch (error) {
                console.log("Error While Deletings Files " + error)
            }
        }
    }
}

module.exports = fetchData