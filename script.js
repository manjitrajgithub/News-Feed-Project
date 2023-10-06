const weatherBtn = document.getElementById("weather")
const sportsBtn = document.getElementById("sports")
const EntertainmentBtn = document.getElementById("Entertainment")
const scienceBtn = document.getElementById("science")
const searchBtn = document.getElementById("search")
const newsQuery = document.getElementById("newsQuery");
const newstype = document.getElementById("newstype");
const newsdetails = document.getElementById("newsdetails");
//Array
let newsdataArr = [];

//APIS
const apiKey = '622e9e2647b8425e965e11597c8a582b';
const Weather_news = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=';
const sports_news = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=';
const Entertainment_news = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=';
const science_news = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=';
const search_news = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=';



window.onload = function () {
    newstype.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlinesNews();
};



weatherBtn.addEventListener("click", function () {
    newstype.innerHTML = "<h4>Weather News</h4>";
    fetchWeatherNews();
});

sportsBtn.addEventListener("click", function () {
    newstype.innerHTML = "<h4>sports</h4>";
    fetchSportsNews();
});

EntertainmentBtn.addEventListener("click", function () {
    newstype.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

scienceBtn.addEventListener("click", function () {
    newstype.innerHTML = "<h4>science</h4>";
    fetchScienceNews();
});

searchBtn.addEventListener("click", function () {
    newstype.innerHTML = "<h4>search :" + newsQuery.value + "</h4>";
    fetchQueryNews();
});


const fetchHeadlinesNews = async () => {
    const response = await fetch(Headlines_news + apiKey);
    newsdataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsdataArr = myJson.articles;

    } else {
        //error handle
        console.log(response.status, response.statusText);
    }

    displayNews();

}


const fetchWeatherNews = async () => {
    const response = await fetch(Weather_news + apiKey);
    newsdataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsdataArr = myJson.articles;

    } else {
        //error handle
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchSportsNews = async () => {
    const response = await fetch(sports_news + apiKey);
    newsdataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsdataArr = myJson.articles;

    } else {
        //error handle
        console.log(response.status, response.statusText);

    }

    displayNews();

}

const fetchEntertainmentNews = async () => {
    const response = await fetch(Entertainment_news + apiKey);
    newsdataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsdataArr = myJson.articles;

    } else {
        //error handle
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchScienceNews = async () => {
    const response = await fetch(science_news + apiKey);
    newsdataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsdataArr = myJson.articles;

    } else {
        //error handle
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchSearchNews = async () => {
    const response = await fetch(search_news + apiKey);
    newsdataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsdataArr = myJson.articles;

    } else {
        //error handle
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchQueryNews = async () => {


    if (newsQuery.value == null)
        return;

    const response = await fetch(search_news + encodeURIComponent(newsQuery.value) + "&apiKey=" + apiKey);
    newsdataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsdataArr = myJson.articles;

    } else {
        //error handle
        console.log(response.status, response.statusText);
    }

    displayNews();
}

function displayNews() {

    newsdetails.innerHTML = "";

    if (newsdataArr.length == 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    newsdataArr.forEach(news => {

        let date = news.publishedAt.split("T")
        let col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        let card = document.createElement("div");
        card.className = "p-2";

        let image = document.createElement("img");
        image.setAttribute("height", "matchparnt");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;
        let cardbody = document.createElement("div");
        let newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        let discription = document.createElement("p");
        discription.className = "text-muted";
        discription.innerHTML = news.discription;

        let link = document.createElement("a");
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardbody.appendChild(newsHeading);
        cardbody.appendChild(dateHeading);
        cardbody.appendChild(discription);
        cardbody.appendChild(link)


        card.appendChild(image);
        card.appendChild(cardbody);

        col.appendChild(card);

        newsdetails.appendChild(col);


    });
}