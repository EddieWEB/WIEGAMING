//importerar alla mina klasser så att jag kan använda dem i detta script, 
import ProductHandler from "../classes/ProductHandler.js";
import ProductTemplate from "../classes/ProductTemplate.js";
import ImageAPI from "../classes/imageAPI.js";

//lägger klasserna i variablar
const imgAPI = new ImageAPI();
var product = new ProductTemplate();
const ph = new ProductHandler();
//Anger kategorier
const productCategories = [
    'Skärmar',
    'Tangentbord',
    'Möss',
    'Konsoler',
    'Gamingstolar',
    'Musmattor',
    'Hörlurar'
];
//Hämtar form från admin.html som object
const form = {
    title: document.querySelector("#title"),
    category: document.querySelector("#category"),
    price: document.querySelector("#price"),
    stock: document.querySelector("#stock"),
    shortDescription: document.querySelector("#short-description"),
    description: document.querySelector("#description")
};

//Konverterar det till en array och loopar igenom alla keys
Object.keys(form).forEach(key => {
    form[key].value = product[key];
});

//För att enkelt kunna spara ner dummy data till localstorage
/* var title = ["Microsoft", "Nintendo", "XBOX", "Sony"];
form.title.value = title[Math.floor(Math.random() * title.length)];
form.price.value = Math.floor(Math.random() * (350 - 50) + 50) * 10;
form.stock.value = Math.floor(Math.random() * (20 - 0)); */

//Hämtar LoremIpsum text för dummy description
/* try {
    fetch('https://loripsum.net/api/3/short', { mode: 'cors' })
        .then(req => req.text())
        .then(resp => form.description.value = 'PRODUKTBESKRIVNING\n\n' + resp)
        .catch(e => console.log(e));
}catch(err){console.log('Cors plugin ej aktiverad')}; */


//Populerar select dropdown med options i html
productCategories.forEach(category => {
    let option = document.createElement("option");
    option.setAttribute("value", category);
    option.innerText = category;
    form.category.appendChild(option);
});

//För att enkelt kunna spara ner dummy data till localstorage
//form.category.value = "Konsoler";

//Lägger till ett clickevent på "lägg till produkt" knappen
document.querySelector("#add-product-btn").addEventListener('click', (e) => {
    e.preventDefault();

    //Tar alla värden från formen och sätter in i product templaten  
    Object.keys(form).forEach(key => {
        product[key] = form[key].value;
    });

    //Kallar på metoden från class ProductHandler
    ph.addProduct(product);

    //Rensar inputfälten på data
    Object.keys(form).forEach(key => {
        form[key].value = "";
    });

    product = new ProductTemplate();

    //Rensa imageboxen 
    document.querySelector('.right-col').innerHTML = "No image";
});

//Lägger till clickevent på knappen för att hämta bild
document.querySelector('#retrieve-img-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let urlInput = document.querySelector("#image-input");

    if (urlInput.value.length < 5) return;

    //Hämtar image genom input, får tillbaka bild datat, error ligger i data, hanterar det med if statement
    imgAPI.getImage(urlInput.value).then(imageData => {
        if (imageData.data.error) {
            urlInput.value = "";
            return alert(imageData.data.error);
        }

        //Populerar inputfälten med datat från bildlänken och hämtar 2 url:er, en som thumbnail
        product.id = imageData.data.id;
        product.link = imageData.data.link;
        product.thumbnail = imageData.data.link.split(".jpg")[0] + "b.jpg";

        //Om data från urllänken finns sätts det automatiskt in i inputfälten
        if (imageData.data.title)
            form.title.value = imageData.data.title;

        if (imageData.data.description)
            form.description.value = imageData.data.description;

        //Rensar inputfältet för url
        urlInput.value = "";

        //Skapar en image som visas baserat på den url länk man satt i inputfältet
        let imgElem = document.createElement("img");
        imgElem.setAttribute('src', product.thumbnail);
        imgElem.setAttribute("referrerpolicy", "no-referrer");
        imgElem.setAttribute("width", "440");
        imgElem.setAttribute("height", "440");

        let imgContainer = document.querySelector(".right-col");
        imgContainer.innerHTML = "";
        imgContainer.appendChild(imgElem);

    });

})


function renderEditList() {
    let tBody = document.querySelector('table > tbody');

    ph.products.forEach(p => {
        let template = document.createElement('template');
        template.innerHTML = `
            <tr>
                <td><img src="${p.thumbnail}" referrerpolicy="no-referrer" width="50"></td>
                <td>${p.title}</td>
                <td>${p.price}</td>
                <td>${p.category}</td>
                <td>${p.shortDescription}</td>
                <td>
                    <button class="btn btn-primary">Editera</button>
                    <button class="btn btn-danger">Ta bort</button>
                </td>
            </tr>
        `;

        let tr = template.content.cloneNode(true);

        tr.querySelector(".btn-primary").addEventListener('click', e => {

            document.querySelector('#add-product-btn').style.display = "none";

            document.querySelector('#update-product-btn').style.display = "inline-block";
            document.querySelector('#delete-product-btn').style.display = "inline-block";

            product = p;

            Object.keys(form).forEach(key => {
                form[key].value = p[key];
            });

            let imgElem = document.createElement("img");
            imgElem.setAttribute('src', product.thumbnail);
            imgElem.setAttribute("referrerpolicy", "no-referrer");
            imgElem.setAttribute("width", "440");
            imgElem.setAttribute("height", "440");

            let imgContainer = document.querySelector(".right-col");
            imgContainer.innerHTML = "";
            imgContainer.appendChild(imgElem);
        });

        tr.querySelector(".btn-danger").addEventListener('click', () => {
            ph.deleteProduct(p.id);
        })

        tBody.appendChild(tr);

    });
}

//EVentlistener, klick uppdaterar produkt
document.querySelector("#update-product-btn").addEventListener('click', (e) => {
    e.preventDefault();

    Object.keys(form).forEach(key => {
        product[key] = form[key].value;
    });

    ph.updateProduct(product);
});

//Eventlistener, klick tar bort produkten från listan(samt localstorage)
document.querySelector("#delete-product-btn").addEventListener('click', (e) => {
    e.preventDefault();

    ph.deleteProduct(product.id);
})

renderEditList();








