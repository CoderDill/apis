let favNumber = 5;
let baseURL = "http://numbersapi.com";


async function part1() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
part1();


const favNumbers = [7, 10, 11, 13];
async function part2() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
part2();


async function part3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach((data) => {
    $("body").append(`<p>${data.text}</p>`);
  });
}
part3();


$(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  // 1.
  async function part1() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  // 2.
  async function part2() {
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [firstCardData, secondCardData].forEach((card) => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  // 3.
  async function setup() {
    let $btn = $("button");
    let $cards = $("#cards");

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on("click", async function () {
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      
      $cards.append(
        $("<img>", {
          src: cardSrc          
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  setup();
});
