let API_key = '0Al2XT5XD35ahPXsk85pGa6yi75wv2ga';
let endpoint = ['trending','search','random'];
let search = {trending: '&tag=',search: '&q='}; // concatenate strings with input text
let topic = ['cow', 'outside', 'diabeetus', 'bronchitis'];
let limit = '&limit=10'; 
let rating = '&rating=R';
let queryURL = "https://api.giphy.com/v1/gifs/" + endpoint[1] + "?api_key=" + API_key + search + limit + rating;


$( document ).ready(function() {
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    
      .then(function(response) {
        topic.forEach(function(t) {
            $('#giphyButtons').append(`<button type="button" class="btn btn-secondary">${t}</button>`)
        })
      });
});