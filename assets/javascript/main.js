let API_key = '0Al2XT5XD35ahPXsk85pGa6yi75wv2ga';
let endpoint = ['trending','search','random'];
let search = {trending: '&tag=',search: '&q='}; // concatenate strings with input text
let topic = ['cow', 'outside', 'diabeetus', 'bronchitis'];
let limit = '&limit=10'; 
let rating = '&rating=R';
let isAnimated = false;

// let starterURL = "https://api.giphy.com/v1/gifs/" + endpoint[1] + "?api_key=" + API_key + search.search + limit + rating;

$( document ).ready(function() {
    createTopicButtons();
    
    $('#giphyButtons .btn').on('click', function() {
        outputGifs($(this));

    })
    
    $('#gifSection').on('click', '.btn',function() {
        console.log('button clicked')
        // if ($(this).attr('data-animated') === false) {
    
        // }
    })
});

// FUNCTIONS
function outputGifs(clicked) {
    let queryURL = "https://api.giphy.com/v1/gifs/" + endpoint[1] + "?api_key=" + API_key + search.search + clicked.text() + limit + rating;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response) {
        console.log(response);
        console.log(response.data);
        
        ;
        for (i=0; i < response.data.length; i++) {
            let gifImg = $(`<button><img class="btn" data-animated="${isAnimated}" src="${response.data[i].images.fixed_width_still.url}"></button>`);
            let rating = $(`<p>`).text(`Rating: ${response.data[i].rating}`);
            let newGifDiv = $(`<div id="gifDIV-${i}" class="d-flex flex-column text-center my-auto mx-1"></div>`)
            console.log(response.data[i].images.fixed_width_still.url);
            $('#gifSection').prepend(newGifDiv);
            $(`#gifDIV-${i}`).append(gifImg, rating);

        }
    });
};
function createTopicButtons() {
    topic.forEach(function(t) {
        $('#giphyButtons').append(`<button id="btn-${t}" type="button" class="btn btn-secondary">${t}</button>`)
    })
};