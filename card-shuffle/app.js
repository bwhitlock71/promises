$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    $.getJSON(`${baseURL}/new/draw/`).then(data => {
      let { suit, value } = data.cards[0];
      console.log(`${value} of ${suit}`);
    });

    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw`).then(data => {
        firstCard = data.cards[0]; 
        let deckId = data.deck_id; 
        return $.getJSON(`${baseURL}/${deckId}/draw/`)
    })
    .then(data => {
      let secondCard = data.cards[0];
      [firstCard, secondCard].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#cards');

  $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
      let cardSrc = data.cards[0].image;
      $cardArea.append(
        $('<img>', {
          src: cardSrc
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
});