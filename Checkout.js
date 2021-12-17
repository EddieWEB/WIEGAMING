document.querySelector('#btnPay').addEventListener('click', payFunction);

const shopperInfo = {
    mail: document.getElementById('mailInput'),
    firstName: document.getElementById('namnInput'),
    lastName: document.getElementById('lastnameInput'),
    adress: document.getElementById('adressInput'),
    postCode: document.getElementById('postcodeInput'),
    postOrt: document.getElementById('postortInput'),
    phoneNumber: document.getElementById('phoneInput')
}

const payWithCart = {
    cardName: document.getElementById('cc-name'),
    cardNumber: document.getElementById('cc-number'),
    cardexpire: document.getElementById('cc-expiration'),
    cardCvv: document.getElementById('cc-cvv')
}

const listProduct = document.querySelector("#product-list")
const nameProduct = document.querySelector("#product-name")
const priceProduct = document.querySelector("#product-price")
const QtyProduct = document.querySelector("#product-qty")
const totalCart = document.querySelector("#cart-total")
const getFromCart = JSON.parse(localStorage.getItem("cart")) || [{name: "Laptop", price: 4, qty: 1}, {name: "Laptop", price: 4, qty: 1}]


function setCartLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(getFromCart));
}

function payFunction(e){
e.preventDefault();

let mail = document.getElementById('mailInput').value
let firstName = document.getElementById('namnInput').value
let lastName = document.getElementById('lastnameInput').value
let adress = document.getElementById('adressInput').value
let postCode = document.getElementById('postcodeInput').value
let postOrt = document.getElementById('postortInput').value
let phoneNumber = document.getElementById('phoneInput').value

const div = document.querySelector("#kundinfo");

div.innerHTML += `<li>Email: ${mail} <br> Telefonnummer: ${phoneNumber} <br> 
${firstName} ${lastName} <br> ${adress} <br> ${postCode} ${postOrt}</li>`
div.style.listStyleType ="none";


const a = document.getElementById("postnord")
const b = document.getElementById("homedelivery")
const c = document.getElementById("instabox")

if (a.checked == true){
  let a = document.getElementById("postnord").value
  document.querySelector("#leveransinfo").innerHTML = a;
} else if (b.checked == true){
  let b = document.getElementById("homedelivery").value
  document.querySelector("#leveransinfo").innerHTML = b;
} else if (c.checked == true) {
  let c = document.getElementById("instabox").value
  document.querySelector("#leveransinfo").innerHTML = c;
} 


const d = document.getElementById("credit")

if (d.checked == true) {
let d = document.getElementById("credit").value
document.querySelector("#betalinfo").innerHTML = d;
}




      




/*
// om input inte fylls i funkar inte knappen (Betalning)
  if(!payWithCart.cardName.value) return;
    if(!payWithCart.cardNumber.value) return;
    if(!payWithCart.cardexpire.value) return;
    if(!payWithCart.cardCvv.value) return;


// om input inte fylls i funkar inte knappen (Dina uppgifter)
    if(!shopperInfo.mail.value) return;
    if(!shopperInfo.firstName.value) return;
    if(!shopperInfo.lastName.value) return;
    if(!shopperInfo.adress.value) return;
    if(!shopperInfo.postCode.value) return;
    if(!shopperInfo.postOrt.value) return;
*/
    // hämta modal
    const modal = document.getElementById("myModal");

    // hämta kryss knapp
    const span = document.getElementsByClassName("close")[0];
    
    // När användare trycker på myBtn, öppna Modal
    modal.style.display = "block";

    // När användare trycker på <span> (x), stäng Modal
    span.onclick = function(){
    modal.style.display = "none";
    }

    // När användare trycker utanför Modal, stäng Modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
    }
    }
 

    // tömmer input fälten efter click (betalning)
    Object.keys(payWithCart).forEach(key => {

    payWithCart[key].value = "";     
    });

    // tömmer input fälten efter click (dina uppgifter)
    Object.keys(shopperInfo).forEach(key => {

        shopperInfo[key].value = "";     
         });
}


// discoun button lagt till en alert och att inputfältet blir tom efter man tryckt på knappen
document.querySelector('.btn2').addEventListener('click', discountButton);

const discount = document.querySelector('#discountInput');

function discountButton(){
    alert("Fyll i en GILLTIG Rabbatkod!!! 🤪🤪🤪")

    Object.keys(discount).forEach(key => {

        discount[key].value = "";   

         });
}



// checkbox leverans och betalning
function myCheckBox() {

    const checkBoxDelivery = document.getElementById("postnord");
    var text = document.getElementById("textpostnord");

    if (checkBoxDelivery.checked == true){
      text.style.display = "block";
    } else {
       text.style.display = "none";
    }


    const checkBoxHomeDelivery = document.getElementById("homedelivery");
    var text = document.getElementById("texthomedelivery");

    if (checkBoxHomeDelivery.checked == true){
        text.style.display = "block";
      } else {
         text.style.display = "none";
      }
      const checkBoxInstaBox = document.getElementById("instabox");
      var text = document.getElementById("textinstabox");
  
      if (checkBoxInstaBox.checked == true){
          text.style.display = "block";
        } else {
           text.style.display = "none";
        }

        const checkBoxVisaCard = document.getElementById("credit");
        var text = document.getElementById("textvisacard");
    
        if (checkBoxVisaCard.checked == true){
            text.style.display = "block";
          } else {
             text.style.display = "none";
          }
        }


