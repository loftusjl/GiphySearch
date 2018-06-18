var queryURL = "https://api.giphy.com/v1/gifs/" + option + "?api_key=" + API_key + search;
let API_key = '0Al2XT5XD35ahPXsk85pGa6yi75wv2ga';
let option = ''
let search = '&tag='

$.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {

  });