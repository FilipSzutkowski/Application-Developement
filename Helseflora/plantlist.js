const title = document.querySelector('h3');
const plantlistDiv = document.querySelector('#plantlist');
const kategori = localStorage.getItem('plantData');
const url = 'https://sukkergris.no/plants/?category=' + kategori;
const template = document.createElement('template');
let list;
template.innerHTML = `
    <style>
        article {
            display: grid;
            grid-template-columns: 100px 1fr;
            row-gap: 1px;
            grid-template-areas: 
                "img name"
                "img description"
                "img price";  
            align-items: center;
            padding-top: 1em;
            padding-bottom: 1em;
            padding-left: 0.5em;
            cursor: pointer;
            
        }

        h3 {
            grid-area: name;
            font-size: 1rem;
            font-weight: 400;
            margin: 0;
        }
        main {
            grid-area: description;
            opacity: 80%;
            font-size: 0.9rem;
        }
        p {
            grid-area: price;
            font-size: 1rem;
            font-weight: 300;
            margin: 0
        }

        img {
            grid-area: img;
            justify-self: center;
            align-self: center;
            box-shadow:
            0 0px 1px rgba(0, 0, 0, 0.094),
            0 0px 2.8px rgba(0, 0, 0, 0.135),
            0 0px 6.6px rgba(0, 0, 0, 0.176),
            0 0px 22px rgba(0, 0, 0, 0.27);
            border-radius: 5px;
        }

        article:hover {
            background-color: #43d8c9;
        }
    </style>
    <article class="plant-item">
        <img />
        <h3></h3>
        <main><slot name="description" /></main>
        <p></p>
    </article>

`;

title.textContent = kategori;
loadData();

async function loadData() {
    let response = await fetch(url);
    let plantList = await response.json();

    plantList.forEach(plant => {
        let plantElm = document.createElement('plant-item');
        let plantDescr = document.createElement('main');

        plantElm.setAttribute('name', plant.navn);
        plantElm.setAttribute('image', `http://sukkergris.no/plantimages/small/${plant.bildefil}`);
        plantElm.setAttribute('price', plant.pris);
        plantDescr.setAttribute('slot', 'description');

        plantDescr.textContent = plant.beskrivelse;
        plantElm.appendChild(plantDescr);
        plantlistDiv.appendChild(plantElm);
        plantElm.onclick = () => {
            localStorage.setItem('plantId', plant.id);
            localStorage.setItem('plantName', plant.navn);
            location.href = 'plantpage.html'
        }
    });

    window.customElements.define('plant-item', PlantItem);
}

class PlantItem extends HTMLElement {
    constructor() {
        super(); 
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('p').innerText = `${this.getAttribute('price')} kr.-`;
        this.shadowRoot.querySelector('img').src = this.getAttribute('image');
    }
}
