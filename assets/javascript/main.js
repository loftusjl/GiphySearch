let API_key = '0Al2XT5XD35ahPXsk85pGa6yi75wv2ga';
let endpoint = ['trending', 'search'];
let search = { // concatenate strings with input text
    trending: '&tag=',
    search: '&q='
};
let typeSelected = 1; // selects the search type. Search by default
let topic = ['old greg', 'come at me bro', 'diabeetus', 'bronchitis', 'honey badger'];
let limit = '&limit=10';
let rating = '&rating=R';

$(document).ready(function () {
    createTopicButtons();
    
    $('#add-search').on('click', function (event) {
        event.preventDefault();
        addButton($('#search-term').val())
    })
    $('#gifSection').on('click', 'img', function () {
        toggleAnimation($(this));
    })
    $('#random-gifs').on('click', function(event) {
        event.preventDefault();
        let queryURL = "https://api.giphy.com/v1/gifs/" + endpoint[2] + "?api_key=" + API_key + limit + rating;
        console.log(queryURL)
        console.log(`Work in progress.....`)
    
        $.ajax({
                url: queryURL,
                method: "GET"
            })
    
            .then(function (response) {
                console.log(response.data);

                    let gifImg = $(`<img class="" data-animationOn="false" "data-animated="${response.data.images.fixed_width.url}" src="${response.data.images.fixed_width_still.url}">`);
                    let newGifDiv = $(`<div class="d-flex flex-column text-center my-auto mx-1 randomGif"></div>`)
                    $('#gifSection').prepend(newGifDiv);
                    $(`.randomGif`).append(gifImg);
            });
    })
});

// FUNCTIONS
function outputGifs(clicked) {
    let queryURL = "https://api.giphy.com/v1/gifs/" + endpoint[typeSelected] + "?api_key=" + API_key + search.search + clicked.text() + limit + rating;
    console.log(queryURL)

    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {
            console.log(response.data);

            // output gifs
            for (i = 0; i < response.data.length; i++) {
                // output gifs as buttons
                let gifImg = $(`<img class="" data-animationOn="false" data-index="${i} "data-animated="${response.data[i].images.fixed_width.url}" src="${response.data[i].images.fixed_width_still.url}">`);
                let rating = $(`<p>`).text(`Rating: ${response.data[i].rating}`);
                let newGifDiv = $(`<div id="gifDIV-${i}"  class="d-flex flex-column text-center my-auto mx-1"></div>`)
                $('#gifSection').prepend(newGifDiv);
                $(`#gifDIV-${i}`).append(gifImg, rating);
            }
        });
};

function toggleAnimation(i) {
    dIndex = parseInt(i.attr('data-index'))
    let ani1URL = '';
    let ani2URL = '';
    ani1URL = i.attr('data-animated') // animated URL is in data-animated attr
    ani2URL = i.attr('src') // still URL is currently set to img src
    i.attr('data-animated', ani2URL) // set data-animated to off URL for storage
    i.attr('src', ani1URL) // set img src to on URL
};

function createTopicButtons() {
    topic.forEach(function (t) {
        $('#giphyButtons').append(`<button id="btn-${t}" type="button" class="btn btn-secondary topic-button font-weight-bold shadow">${t}</button>`)
    })
    $('#giphyButtons .btn').on('click', function () { // listen for topic clicks. Listener is inside createTopicButtons so that when buttons are added to, the listener even still works.
        outputGifs($(this));
    })
};

function addButton(s) {
    topic.push(s);
    console.log(topic)
    $('.topic-button').remove();
    createTopicButtons();
};

// $('#add-search').on('click', function() {
//     typeSelected = parseInt($(this).val());
//     if (typeSelected === 2) {
//         queryURL = "https://api.giphy.com/v1/gifs/" + endpoint[typeSelected] + "?api_key=" + API_key + limit + rating;
//         console.log(`Random: ${queryURL}`);
//     }
//     else if ($('#search-term').val()) {
//         if (typeSelected === 1) {
//             queryURL = "https://api.giphy.com/v1/gifs/" + endpoint[typeSelected] + "?api_key=" + API_key + search.search + $('#search-term').val() + limit + rating;
//             console.log(`Search: ${$('#search-term').val()} URL:${queryURL}`);
//         }
//         else {
//             queryURL = "https://api.giphy.com/v1/gifs/" + endpoint[typeSelected] + "?api_key=" + API_key + search.trending + $('#search-term').val() + limit + rating;
//             console.log(`Trending: ${$('#search-term').val()} URL:${queryURL}`);
//         }
//     }
//     else {
//         alert(`Please enter text before searching`)
//     }
//     createTopicButtons();
// })