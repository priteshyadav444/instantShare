const nodemailer = require("nodemailer")

const sendMail = async (from, to, subject, text, html) => {
    // let transport = nodemailer.createTransport({
    //     service: 'SendinBlue',
    //     auth: {
    //         user: process.env.MAIL_USER,
    //         pass: process.env.MAIL_PASS
    //     }
    // })


    let transporter = nodemailer.createTransport({
        // offical email handler
        host: "smtp.gmail.com",
        port: "587",
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
    });

    let info = await transporter.sendMail({
        from: `InstantShare <${from}>`,
        to: to,
        subject: subject,
        text: text,
        html: html
    })

}

module.exports = sendMail;