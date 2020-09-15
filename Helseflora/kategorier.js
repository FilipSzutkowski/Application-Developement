const kategorier = document.querySelector('.kategorier');
const url = 'https://sukkergris.no/plantcategories/';

loadData();

async function loadData() {
    let response = await fetch(url);
    let kategorierObj = await response.json();

    kategorierObj.forEach(item => {
        let kategoriElm = document.createElement('article');
        kategoriElm.classList.add('kategori');
        kategoriElm.textContent = item.kategori;
        kategorier.appendChild(kategoriElm);
    })
}