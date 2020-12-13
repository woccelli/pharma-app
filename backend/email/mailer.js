const nodemailer = require("nodemailer");


module.exports = async function sendEmail(data) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: data.sendtoemail, // list of receivers
        subject: data.name, // Subject line
        text: "Bonjour", // plain text body
        html: "<b>Bonjour</b>", // html body
        attachments: [{
            // define custom content type for the attachment
            filename: data.name+'.pdf',
            content: data.pdf64.split(',')[1],
            encoding: 'base64'
        },  {   // utf-8 string as an attachment
            filename: 'text.txt',
            content: 'Attachments'
        }]
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
