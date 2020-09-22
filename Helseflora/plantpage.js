const title = document.querySelector('h3');
const plantDetailsSection = document.querySelector('#plantDetails');
const plantId = localStorage.getItem('plantId');
const plantName = localStorage.getItem('plantName')
const url = 'https://sukkergris.no/plant/?id=' + plantId;
const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous">
    <style>
        article {
            display: flex;
            flex-direction: column;
        }

        div {
            display: flex;
            justify-content: center;
            background-color: #43d8c9;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        img {
            align-self: center;
            max-width: 80%;
            max-height: 50vh;
            height: auto;
            box-shadow:
            0 0px 1.1px rgba(0, 0, 0, 0.16),
            0 0px 3px rgba(0, 0, 0, 0.23),
            0 0px 7.2px rgba(0, 0, 0, 0.3),
            0 0px 24px rgba(0, 0, 0, 0.46);
            border-radius: 5px;
        }

        p {
            margin: 0;
        }

        section>section {
            margin-bottom: 1em;
        }

        .text-info {
            padding: 1em;
        }

        #kategori {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 0.5em;
            opacity: 80%;
        }

        #descr {
            margin-bottom: 1em;
            font-weight: 400;
        }

        #vekstsone {
            margin-bottom: 1em;
        }

        #pris {
            font-size: 1.5rem;
            font-weight: 400;
            opacity: 90%;
            background-color: #43d8c9;
            padding: 0.3em;
            border-radius: 5px;
        }

        i {
            font-size: 1.5rem;
            opacity: 90%;
            background-color: #43d8c9;
            padding-top: 0.4em;
            padding-bottom: 0.45em;
            padding-right: 0.5em;
            padding-left: 0.5em;
            margin-left: 0.5em;
            cursor: pointer;
            border-radius: 5px;
        }

        i:hover {
            color: white;
        }
    </style>
    <article class="plant-details">
        <div>
            <img />
        </div>
        <section class="text-info">
            <p id="kategori"></p>
            <p id="descr"></p>
            <hr color="#43d8c9">
            <section>
                <p id="hoyde"></p>
                <p id="vekstsone"></p>
                <p id="info"></p>
            </section>
            <span id="pris"></span><i class="fas fa-cart-plus"></i>
        <section>
    </article>
`;
title.textContent = plantName;

loadData();

async function loadData() {
    let response = await fetch(url);
    let plantDetailsObj = await response.json();
    let plantDetailsElm = document.createElement('plant-details');

    plantDetailsElm.setAttribute('image', `http://sukkergris.no/plantimages/large/${plantDetailsObj.bildefil.replace('.png', '.jpg')}`);
    plantDetailsElm.setAttribute('kategori', plantDetailsObj.kategori);
    plantDetailsElm.setAttribute('descr', plantDetailsObj.beskrivelse);
    plantDetailsElm.setAttribute('hoyde', plantDetailsObj.hoyde);
    plantDetailsElm.setAttribute('vekstsone', plantDetailsObj.vekstsone);
    plantDetailsElm.setAttribute('nitrogen', plantDetailsObj.nitrogen);
    plantDetailsElm.setAttribute('kalium', plantDetailsObj.kalium);
    plantDetailsElm.setAttribute('fosfor', plantDetailsObj.fosfor);
    plantDetailsElm.setAttribute('mintempdag', plantDetailsObj.min_temp_dag);
    plantDetailsElm.setAttribute('mintempnatt', plantDetailsObj.min_temp_natt);
    plantDetailsElm.setAttribute('pris', plantDetailsObj.pris);

    plantDetailsSection.appendChild(plantDetailsElm);

    window.customElements.define('plant-details', PlantDetails);
}

class PlantDetails extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('img').src = this.getAttribute('image');
        this.shadowRoot.querySelector('#kategori').textContent = `Kategori: ${this.getAttribute('kategori')}`;
        this.shadowRoot.querySelector('#descr').textContent = this.getAttribute('descr');
        this.shadowRoot.querySelector('#hoyde').textContent = `Normal høyde: ${this.getAttribute('hoyde')} cm`;
        this.shadowRoot.querySelector('#vekstsone').textContent = `Vekstsone: ${this.getAttribute('vekstsone')}`;;
        this.shadowRoot.querySelector('#info').textContent = `Anbefalt gjødselmix: ${this.getAttribute('nitrogen')}% nitrogen, ${this.getAttribute('kalium')}% kalium og ${this.getAttribute('fosfor')}% fosfor. Bør ikke plantes hvis temperaturen om dagen er under ${this.getAttribute('mintempdag')} grader, eller temperaturen om natten er under ${this.getAttribute('mintempnatt')} grader.`;
        this.shadowRoot.querySelector('#pris').textContent = `${this.getAttribute('pris')} kr.-`;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('i').onclick = e => {
            let cartItem = { 'price': this.attributes.pris.value, 'name': localStorage.getItem('plantName') };

            if (localStorage.getItem('cartItems') === null) {
                localStorage.setItem('cartItems', `[${JSON.stringify(cartItem)}]`);
            } else if (localStorage.getItem('cartItems').includes(cartItem.name)) {
                return; 
            } else {
                localStorage.setItem('cartItems', `${localStorage.getItem('cartItems').replace(']', ', ')}${JSON.stringify(cartItem)}]`);
            }
            
            
            
            console.log(localStorage.getItem('cartItems'));
        }
    }

}
