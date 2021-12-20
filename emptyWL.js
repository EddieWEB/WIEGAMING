function randomPic () {
    const request = new XMLHttpRequest();

    request.open("get", "https://api.unsplash.com/photos/random?query=depressed&count=1&client_id=0rx-7YziGErP3yr_pnCYV1G7ecyhOdFcx0N-o-UZXPo");

    request.send();

    request.onload = () => {


        const data = JSON.parse(request.response);

        document.querySelector(".empty-WL-div").innerHTML = `
        <p>Det verkar som om din wishlist är tom..</p>
        <img class="random-pic" src="${data[0].urls.small}" alt="Random API picture"/>  
        `
    }
}

document.querySelector(".emptyWL").addEventListener("click", randomPic);