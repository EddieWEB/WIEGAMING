// Skapa en funktion som hämtar en random bild med tema och lägger in den i en div
function randomSadPic() {

    // Create request object 
    const request = new XMLHttpRequest();

    //Give request API key to generate random depressed picture from Unsplash
    request.open("get", "https://api.unsplash.com/photos/random?query=depressed&count=1&client_id=0rx-7YziGErP3yr_pnCYV1G7ecyhOdFcx0N-o-UZXPo")

    //send the request
    request.send();

    //Retrieve the request from unsplash
    request.onload = () => {
        
        // Convert the object resp  onse from API and set that to a constant
        const data = JSON.parse(request.response);
        console.log(data)
        console.log(data[0].urls.small)

       document.querySelector(".emptySC").innerHTML = `
        <img class="random-sad-gif" alt="Random gif from API" src="${data[0].urls.small}"/>
        `
    } 
}

document.querySelector("button").addEventListener("click", randomSadPic);