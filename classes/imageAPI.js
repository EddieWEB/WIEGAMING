//Skapat en klass för att hämta bilder från imgur.com 
//Skapade sedan en metod, getImage, som först ser tittar om id angetts annars stoppas koden med return. 
//Om id inkluderar imgur splittras url länken vid com/ och hämtar array nummer 1, vilket blir ett id nummer.
//Fetchar sedan url länken till imgur + id för att få vald bild. 
//catch fångar upp möjliga errors och alertar isåfall dessa
class ImageAPI {
    constructor() {
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer 5c0124b7203598cbe24fc0bda9d9c4ea250273de');
    }
    async getImage(id) {
        if(!id) return;
        id = id.includes("imgur") ? id.split("com/")[1] : id;
        return await fetch('https://api.imgur.com/3/account/wie21sGrupp4/image/' + id, {
            method: 'GET',
            headers: this.headers
        }).then(response => response.json())
        .catch(err => alert(err));
    }
}

export default ImageAPI;