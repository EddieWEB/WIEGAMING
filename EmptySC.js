// Skapa en funktion som hämtar en random gif och lägger in den i en div
// OBS - limited to 42 reads per hour and 1000 searches per day.. :-)
function randomSadGif() {

    // Create request object 
    const request = new XMLHttpRequest();

    //Give request API key to generate random sad gif from Giphy
    request.open("get", "https://api.giphy.com/v1/gifs/random?api_key=pvfMt1e2NQwFaNlbRG4k06I1eM5KMM4N&tag=sad&rating=g")

    //send the request
    request.send();

    //Retrieve the request from giphy API
    request.onload = () => {
        
        // Convert the object response from API and set that to a constant
        const data = JSON.parse(request.response);
        console.log(data)
        console.log(data.data.url)

        document.querySelector(".gif").innerHTML = `
        <img class="random-sad-gif" alt="Random gif from API" src="${data.data.bitly_gif_url}"/>
        `
    } 
}

document.querySelector("button").addEventListener("click", randomSadGif);