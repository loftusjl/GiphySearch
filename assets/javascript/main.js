let API_key = '0Al2XT5XD35ahPXsk85pGa6yi75wv2ga';
let endpoint = ['trending','search','random'];
let search = {trending: '&tag=',search: '&q='}; // concatenate strings with input text
let topic = ['cow', 'outside', 'diabeetus', 'bronchitis'];
let limit = '&limit=10'; 
let rating = '&rating=R';

// let starterURL = "https://api.giphy.com/v1/gifs/" + endpoint[1] + "?api_key=" + API_key + search.search + limit + rating;

$( document ).ready(function() {
    createTopicButtons();
    
    $('#giphyButtons .btn').on('click', function() {
        outputGifs($(this));

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
        output = response.data;
        
        // output gifs
        for (i=0; i < response.data.length; i++) {
            // output gifs as buttons
            let gifImg = $(`<img class="" data-animationOn="false" data-index="${i} "data-animated="${response.data[i].images.fixed_width.url}" src="${response.data[i].images.fixed_width_still.url}">`);
            let rating = $(`<p>`).text(`Rating: ${response.data[i].rating}`);
            let newGifDiv = $(`<div id="gifDIV-${i}"  class="d-flex flex-column text-center my-auto mx-1"></div>`)
            console.log(response.data[i].images.fixed_width_still.url);
            $('#gifSection').prepend(newGifDiv);
            $(`#gifDIV-${i}`).append(gifImg, rating);
        }
        $('#gifSection').on('click', 'img',function() {
            console.log('image clicked')
            toggleAnimation($(this),response);
        })
    });
    function toggleAnimation(i,r) {
        dIndex = parseInt(i.attr('data-index'))
        console.log(r.data[dIndex])
        let aniOnURL = '';
        let aniOffURL = '';
        console.log(r.data)
        if (i.attr('data-animationOn') === false) { // image is in still state
            aniOnURL = i.attr('data-animated') // animated URL is in data-animated attr
            aniOffURL = i.attr('src') // still URL is currently set to img src
            i.attr('data-animated', aniOffURL) // set data-animated to off URL for storage
            i.attr('src',aniOnURL) // set img src to on URL
        }
        else { // image is in animated state
            aniOffURL = i.attr('data-animated') // animated URL is in img src
            aniOnURL = i.attr('src') // still URL is in data-animated attr
            i.attr('data-animated', aniOnURL) // set data-animated to on URL for storage
            i.attr('src',aniOffURL) // set img src to off URL
        }
        
    }
};
function createTopicButtons() {
    topic.forEach(function(t) {
        $('#giphyButtons').append(`<button id="btn-${t}" type="button" class="btn btn-secondary">${t}</button>`)
    })
};