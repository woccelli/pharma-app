const nodemailer = require("nodemailer");
const keys = require('../config/keys')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email.smtp.test.pharma@gmail.com',
        pass: keys.gmailPass
    }
});

module.exports = {
    sendSheetEmail: async (data) => {
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: data.sendtoemail, // list of receivers
            subject: data.name, // Subject line
            text: "Bonjour", // plain text body
            html: "<b>Bonjour</b>", // html body
            attachments: [{
                // define custom content type for the attachment
                filename: data.name + '.pdf',
                content: data.pdf64.split(',')[1],
                encoding: 'base64'
            }]
        });
    },
    sendEmailReset: async (user, url) => {
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Réinitialisation du mot de passe', // Subject line
            html: `
                <p>Bonjour ${user.name || user.email},</p>
                <p>Nous sommes désolés d'apprendre que vous avez oublié votre mot de passe. </p>
                <p>Mais pas de panique ! Vous pouvez utiliser le lien suivant pour le réinitialiser:</p>
                <a href=${url}>${url}</a>
                <p>Ce lien expire dans 1 heure.</p>
            ` // html body
        });
    }


}
