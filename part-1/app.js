let favNumber = 71;
let url = "http://numbersapi.com";


// Since axios doesn't support callbacks I have to pull data with jQuery.
 $.getJSON(`${url}/${favNumber}?json`).then(data => {
    console.log(data);
 });

 