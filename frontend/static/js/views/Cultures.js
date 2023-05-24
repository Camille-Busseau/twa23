import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Cultures')
    }

    async getHtml(){

        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        // les données sont chargées ici parce que j'aimerais faire une vue de cultures.js un peu comme celle de culture-view.js où une image du jeu de données serait chargée comme avant-goût
        // construction du tableau d'objets représentant tous les jeux de données accessibles sur la page
        const data = [{
            data: await getData('/static/js/data/37525950.json'), 
            cultureId: "37525950",
            name:"Afghane"
        }]
        data.push({data:await getData('static/js/data/37526769.json'), cultureId:"37526769", name:"Algérienne"})
        data.push({data:await getData('static/js/data/37526778.json'), cultureId:"37526778", name:"Américaine"})
        data.push({data:await getData('static/js/data/37527174.json'), cultureId:"37527174", name:"Chinoise"})
        data.push({data:await getData('static/js/data/37527318.json'), cultureId:"37527318", name:"Égyptienne"})
        data.push({data:await getData('static/js/data/37527426.json'), cultureId:"37527426", name:"Française"})
        data.push({data:await getData('static/js/data/37527534.json'), cultureId:"37527534", name:"Grecque"})
        data.push({data:await getData('static/js/data/37527795.json'), cultureId:"37527795", name:"Japonaise"})
        data.push({data:await getData('static/js/data/37527867.json'), cultureId:"37527867", name:"Coréenne"})
        data.push({data:await getData('static/js/data/37528659.json'), cultureId:"37528659", name:"Espagnol"})

        let listCultures = "<ul>"
        for (let i in data){
            listCultures += "<li><a href='/culture-view/"+data[i].cultureId+"'data-link>"+data[i].name+"</a></li>"
        }
        listCultures += "</ul>"

        return `
            <h1>Cultures</h1>
        `+listCultures
    }
}