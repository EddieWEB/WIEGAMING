document.querySelector('#btnPay').addEventListener('click', payFunction);

const shopperInfo = {
    mail: document.getElementById('mailInput'),
    firstName: document.getElementById('namnInput'),
    lastName: document.getElementById('lastnameInput'),
    adress: document.getElementById('adressInput'),
    postCode: document.getElementById('postcodeInput'),
    postOrt: document.getElementById('postortInput')
}

const payWithCart = {
    cardName: document.getElementById('cc-name'),
    cardNumber: document.getElementById('cc-number'),
    cardexpire: document.getElementById('cc-expiration'),
    cardCvv: document.getElementById('cc-cvv')
}

function payFunction(e){
e.preventDefault();



    if(!payWithCart.cardName.value) return;
    if(!payWithCart.cardNumber.value) return;
    if(!payWithCart.cardexpire.value) return;
    if(!payWithCart.cardCvv.value) return;


// om input inte fylls i funkar inte knappen
    if(!shopperInfo.mail.value) return;
    if(!shopperInfo.firstName.value) return;
    if(!shopperInfo.lastName.value) return;
    if(!shopperInfo.adress.value) return;
    if(!shopperInfo.postCode.value) return;
    if(!shopperInfo.postOrt.value) return;





    // hämta modal
    const modal = document.getElementById("myModal");
    console.log(modal)

    // hämta kryss knapp
    const span = document.getElementsByClassName("close")[0];
    console.log(span)
    
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
 
    // tömmer input fälten efter click
    Object.keys(payWithCart).forEach(key => {

    payWithCart[key].value = "";     
    });


    Object.keys(shopperInfo).forEach(key => {

        shopperInfo[key].value = "";     
         });
}


document.querySelector('.btn2').addEventListener('click', discountButton);

const discount = document.querySelector('#discountInput');

function discountButton(){
    alert("Fyll i en GILLTIG Rabbatkod!!! 🤪🤪🤪")

    Object.keys(discount).forEach(key => {

        discount[key].value = "";   

         });
}

