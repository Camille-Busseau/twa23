import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Visualiser la culture')
    }

    async getHtml() {

        async function getData(url) {
            const response = await fetch(url)
            return response.json()
        }

        // récupération du fichier json demandé
        const data = await getData('/static/js/data/' + this.params.id + '.json')

        // vérification que les objets ont des images à présenter
        let dataSorted = []
        for (let i in data.records) {
            if (data.records[i].hasOwnProperty('images') && data.records[i].images.length > 0) {
                dataSorted.push(data.records[i])
            }
        }

        // séparation des objets en paires pour le rendu de la grille
        let pairedData = []
        while (dataSorted.length) {
            pairedData.push(dataSorted.splice(0, 2))
        }

        // construction de la grille d'images
        let imgGallery = '<div class="gallery">'
        for (let i in pairedData) {
            if (pairedData[i].length % 2 === 0) {
                imgGallery += `
                <div class="container">
                    <div class="half1"><img
                        src="`
                    + pairedData[i][0].images[0].baseimageurl +
                    `"
                        class="w-100 shadow-1-strong rounded mb-4"
                        alt="`
                    + pairedData[i][0].title +
                    `"
                        />
                        `
                if (pairedData[i][0].title) {
                    imgGallery += `
                            <strong>`+ pairedData[i][0].title + `</strong><br>
                            `
                }
                if (pairedData[i][0].period) {
                    imgGallery += `
                            <small>Période : `+ pairedData[i][0].period + `</small><br>
                            `
                }
                if (pairedData[i][0].medium) {
                    imgGallery += `
                            <p>Médium : `+ pairedData[i][0].medium + `</p><br>
                            `
                }
                if (pairedData[i][0].dated) {
                    imgGallery += `
                            <sub>Date : `+ pairedData[i][0].dated + `</sub><br>
                            `
                }
                if (pairedData[i][0].url) {
                    imgGallery += `
                            <small><a href="`+ pairedData[i][0].url + `">Référence</a></small><br>
                            `
                }
                imgGallery += `</div>
                
                    <div class="half2"><img
                        src="`
                    + pairedData[i][1].images[0].baseimageurl +
                    `"
                        alt="`
                    + pairedData[i][1].title +
                    `"
                        />
                        `
                if (pairedData[i][1].title) {
                    imgGallery += `
                            <strong>`+ pairedData[i][1].title + `</strong><br>
                            `
                }
                if (pairedData[i][1].period) {
                    imgGallery += `
                            <small>Période : `+ pairedData[i][1].period + `</small><br>
                            `
                }
                if (pairedData[i][1].medium) {
                    imgGallery += `
                            <p>Médium : `+ pairedData[i][1].medium + `</p><br>
                            `
                }
                if (pairedData[i][1].dated) {
                    imgGallery += `
                            <sub>Date : `+ pairedData[i][1].dated + `</sub><br>
                            `
                }
                if (pairedData[i][1].url) {
                    imgGallery += `
                            <small><a href="`+ pairedData[i][1].url + `">Référence</a></small><br>
                            `
                }
                imgGallery += `</div>
                </div>
                `
            } else {
                imgGallery += `
                <div class="container">
                    <div class="half1">
                        <img
                        src="`
                    + pairedData[i][0].images[0].baseimageurl +
                    `"
                        class="w-100 shadow-1-strong rounded mb-4"
                        alt="`
                    + pairedData[i][0].title +
                        `"
                        />
                        `
                if (pairedData[i][0].title) {
                    imgGallery += `
                        <strong>`+ pairedData[i][0].title + `</strong><br>
                        `
                }
                if (pairedData[i][0].period) {
                    imgGallery += `
                        <small>Période : `+ pairedData[i][0].period + `</small><br>
                        `
                }
                if (pairedData[i][0].medium) {
                    imgGallery += `
                        <p>Médium : `+ pairedData[i][0].medium + `</p><br>
                        `
                }
                if (pairedData[i][0].dated) {
                    imgGallery += `
                        <sub>Date : `+ pairedData[i][0].dated + `</sub><br>
                        `
                }
                if (pairedData[i][0].url) {
                    imgGallery += `
                        <small><a href="`+ pairedData[i][0].url + `">Référence</a></small><br>
                        `
                }
                imgGallery += `</div>
                    <div class="half2"><img style="display:none"/></div>
                </div>
                `
            }
        }

        // retour de la grille html contenant les objets
        return `
            <h1>Oeuvres</h1>
        `+ imgGallery
    }

}