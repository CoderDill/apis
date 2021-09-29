// Part 1
let favNumber = 47;
let baseURL = "http://numbersapi.com";

$.getJSON(`${baseURL}/${favNumber}?json`).then((data) => {
  console.log(data);
});

let favNumbers = [7, 10, 11, 13];
$.getJSON(`${baseURL}/${favNumbers}?json`).then((data) => {
  console.log(data);
});

Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then((facts) => {
  facts.forEach((data) => $("body").append(`<div>${data.text}</div>`));
});

// Part 2
$(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  $.getJSON(`${baseURL}/new/draw/`).then((data) => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  let firstCard = null;
  $.getJSON(`${baseURL}/new/draw/`)
    .then((data) => {
      firstCard = data.cards[0];
      let deckId = data.deck_id;
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then((data) => {
      let secondCard = data.cards[0];
      [firstCard, secondCard].forEach(function (card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  let deckId = null;
  let $btn = $("button");
  let $cards = $(".cards");

  $.getJSON(`${baseURL}/new/shuffle/`).then((data) => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on("click", function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then((data) => {
      let cardSrc = data.cards[0].image;
      $cards.append(
        $("<img>", {
          src: cardSrc,
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
});

const deck = {
  async init() {
    let res = await axios.get("https://deckofcardsapi.com/api/deck/new");
    this.deckId = res.data.deck_id;
  },
  async shuffle() {
    let res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle`
    );
    console.log(res);
  },
};
