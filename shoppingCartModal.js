// selectors
const modal = document.querySelector(".varukorg-modal");
const varukorgKnapp = document.querySelector(".fa-shopping-cart");
const closeVarukorgModal = document.querySelector(".close-btn");

//addeventlistener för att öppna modalen
varukorgKnapp.addEventListener("click", openVarukorg);
closeVarukorgModal.addEventListener("click", closeVarukorg);

// addeventlistener för att stänga om man klickar utanför
document.addEventListener("click", outsideClick)


//funktion för att öppna varukorgsmodal
function openVarukorg () {
    modal.style.display = "block";
}

//funktion för att stänga varukorgsmodal med stängknappen
function closeVarukorg () {
    modal.style.display = "none";
}

//Funktion för att stänga varukorgsmodal om man klickar utanför varukorgen
function outsideClick(click) {
    if (click.target === modal) {
        modal.style.display = "none";
    }
}