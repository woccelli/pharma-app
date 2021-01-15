module.exports = {

    sendSheet: function (sender) {
        return (
            `
            <div>
                <p>Bonjour,</p>
                <p>Votre professionnel de santé <b>${sender.name}</b> vous fait parvenir la fiche de conseils concernant votre pathologie que vous trouverez en pièce jointe.</p>
                <p><b>${sender.name}</b> vous accompagne pour la prise en charge de votre pathologie.</p>
            </div>
            `
        )
    },
    registerUser: function (user) {
        return (
            `
            <div>
                <p>Bonjour,</p>
                <p>Votre compte a été créé avec succès.</p>
                <p>Nous vous souhaitons la bienvenue sur notre application.</p>
                <p>Merci de votre confiance</p>
            </div>
            `
        )
    },
    addUser: function (user, url) {
        return (
            `
            <div>
                <p>Bonjour,</p>
                <p>Un compte utilisateur a été créé sur l’application Toposanté par le biais de votre adresse mail.</p>
                <p>Veuillez cliquer sur le lien ci-dessous afin d’initialiser votre mot de passe et pouvoir utiliser l’application.</p>
                <a href=${url}>${url}</a>
                <p>Ce lien expire dans 48 heures.</p>
                <p>Merci de votre confiance</p>
            </div>
            `
        )
    },
    subUser: function (user) {
        return (
            `
            <div>
                <p>Bonjour,</p>
                <p>Suite à votre abonnement à Toposanté, nous avons le plaisir de vous annoncer que vous bénéficiez d’un accès à l’application jusqu’au ${user.subuntil.toString()}.</p>
                <p>Merci de votre confiance</p>
            </div>
            `
        )
    },
    deleteUser: function (user) {
        return (
            `
            <div>
                <p>Bonjour,</p>
                <p>Nous vous confirmons que votre compte a bien été supprimé de l’application.</p>
                <p>Aucune donnée personnelle n’a été gardée sur l’application conformément à <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3#Article17">l'article 17 du Règlement Europeen Protection des Données</a>.</p>
            </div>
            `
        )
    },
    forgotPwd: function (user, url) {
        return (
            `
                <p>Bonjour,</p>
                <p>Nous sommes désolés d'apprendre que vous avez oublié votre mot de passe. </p>
                <p>Mais pas de panique ! Vous pouvez utiliser le lien suivant pour le réinitialiser:</p>
                <a href=${url}>${url}</a>
                <p>Ce lien expire dans 1 heure.</p>
                <p>Merci de votre confiance</p>
            `
        )
    },
    updateEmailOld: function () {
        return (
            `
            <p>Bonjour,</p>
            <p>Le changement du mail associé à votre compte sur l’application Toposanté a été pris en compte.</p>
            <p>Merci de votre confiance</p>
            `
        )
    },
    updateEmailNew: function () {
        return (
            `
            <p>Bonjour,</p>
            <p>Le changement du mail associé à votre compte sur l’application Toposanté a été pris en compte. La nouvelle adresse est valide.</p>
            <p>Merci de votre confiance</p>
            `
        )
    }
}