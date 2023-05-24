import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Configuration')
    }

    // async function getData(url){
    //     const response = await fetch(url)
    //     return response.json()
    // }

    // en développement
    // le lien ne fonctionne pas pour le download, la documentation se retrouve à la racine de l'app
    async getHtml(){
        return `
            <h1>Configuration</h1>
            <p>Pour la configuration de ce site, veuillez lire la documentation: </p>
            <p>Attention! Ce lien téléchargera automatiquement la <a download href="/documentation.txt">documentation</a></p>
        `
    }
}
