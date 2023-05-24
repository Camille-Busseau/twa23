import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Accueil')
    }

    async getHtml(){
        return `
            <h1>Bienvenue!</h1>
            <p>Retrouvez ici une partie de la collection d'art textile des musées de Harvard classée par culture.</p>
            <a href="/cultures" data-link>Voir les cultures présentées</a>
        `
    }
}