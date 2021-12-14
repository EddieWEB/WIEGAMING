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
    'Datorer',
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

//Populerar select dropdown med options i html
productCategories.forEach(category => {
    let option = document.createElement("option");
    option.setAttribute("value", category);
    option.innerText = category;
    form.category.appendChild(option);
});

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





