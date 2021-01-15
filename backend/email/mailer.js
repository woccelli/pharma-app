const nodemailer = require("nodemailer");
const keys = require('../config/keys');
const { sendSheet, addUser, forgotPwd, registerUser, subUser, deleteUser,updateEmailOld, updateEmailNew } = require("./content/htmlbodies");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email.smtp.test.pharma@gmail.com',
        pass: keys.gmailPass
    }
});

module.exports = {
    sendSheetEmail: async (data, sender) => {
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: data.sendtoemail, // list of receivers
            subject: data.name, // Subject line
            html: sendSheet(sender), // html body
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
            html: forgotPwd(user, url) // html body
        });
    },
    sendEmailAddUser: async (user, url) => {
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Création de votre compte', // Subject line
            html: addUser(user, url)
        });
    },
    sendEmailRegisterUser: async (user) => {
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Création de votre compte', // Subject line
            html: registerUser(user)
        });
    },
    sendEmailSubUser: async (user) => {
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Abonnement de votre compte', // Subject line
            html: subUser(user)
        });
    },
    sendEmailDeleteUser: async (user) => {
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Suppression de votre compte', // Subject line
            html: deleteUser(user)
        });
    },
    sendEmailUpdateEmail: async (userOld, userNew) => {
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: userOld.email, // list of receivers
            subject: "Changement d'adresse mail", // Subject line
            html: updateEmailOld(user)
        });
        await transporter.sendMail({
            from: '"Toposanté" <pharma@toposante.com>', // sender address
            to: userNew.email, // list of receivers
            subject: "Changement d'adresse mail", // Subject line
            html: updateEmailNew(user)
        });
    }
}
