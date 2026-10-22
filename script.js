const visitors = [
  {
    name: "Mrs. Bell, still waiting for the 12:10",
    arrival: "She puts a damp suitcase on the counter. It leaves no mark.",
    clue: "I left it downstairs with my luggage. Six, I think. My husband always said I'd lose my own head if it wasn't attached.",
    items: [
      "Brass. Tag reads ROOM 6. Found upstairs, still in the door.",
      "Small brass key. Luggage tag: 09. Found downstairs.",
      "Small brass key. Luggage tag: 06. Found under the stairs.",
      "Brass. No number. A bicycle-lock key, according to the day clerk.",
    ],
    answer: "key-c",
    reply:
      "Mrs. Bell takes the key. 'there we are. He'll be cross if I'm late.'",
    reason: "She needed the luggage locker key marked 06, found downstairs.",
    itemType: "Key",
  },
  {
    name: "Idris from the maintenance crew",
    arrival:
      "His boots are full of gravel. He keeps looking over your shoulder.",
    clue: "Lost my lamp in the north tunnel. Red means stop down there. I need the other signal. The glass was cracked, but it still worked.",
    items: [
      "Red signal glass. A long crack down one side.",
      "Green glass, no cracks. Still has the shop sticker.",
      "Green signal glass. Cracked down the side. Found in the north tunnel.",
      "Clear glass, cracked base. From the waiting-room table.",
    ],
    answer: "key-c",
    reply:
      "Idris checks the crack. 'Cheers. Don't whistle back if you hear someone downthere'",
    reason: "His lamp had green glass and a crack down the side.",
    itemType: "Lamp",
  },
];
let currentVisitor = 0;
let selectedItem = null;
let answered = false;
let score = 0;
let mistakes = 0;
const scoreDisplay = document.querySelector("#score");
const mistakesDisplay = document.querySelector("#mistakes");
const keyA = document.querySelector("#key-a");
const keyB = document.querySelector("#key-b");
const keyC = document.querySelector("#key-c");
const keyD = document.querySelector("#key-d");
const inspection = document.querySelector("#inspection");
const nextButton = document.querySelector("#next-visitor");

keyA.addEventListener("click", function () {
  selectedItem = "key-a";
  inspection.textContent = visitors[currentVisitor].items[0];
});
keyB.addEventListener("click", function () {
  selectedItem = "key-b";
  inspection.textContent = visitors[currentVisitor].items[1];
});
keyC.addEventListener("click", function () {
  selectedItem = "key-c";
  inspection.textContent = visitors[currentVisitor].items[2];
});
keyD.addEventListener("click", function () {
  selectedItem = "key-d";
  inspection.textContent = visitors[currentVisitor].items[3];
});

const handOver = document.querySelector("#hand-over");
const feedback = document.querySelector("#feedback");

handOver.addEventListener("click", function () {
  if (answered) {
    return;
  }
  if (selectedItem === null) {
    feedback.textContent = "Choose an item first.";
    return;
  }
  answered = true;

  if (selectedItem === visitors[currentVisitor].answer) {
    score = score + 1;
    scoreDisplay.textContent = score;

    feedback.textContent = visitors[currentVisitor].reason;
  } else {
    feedback.textContent = mistakes = mistakes + 1;
    mistakesDisplay.textContent = mistakes;

    feedback;
  }

  handOver.disabled = true;
  keyA.disabled = true;
  keyB.disabled = true;
  keyC.disabled = true;
  keyD.disabled = true;

  nextButton.hidden = false;
});
const visitorName = document.querySelector("#visitor-name");
const visitorArrival = document.querySelector("#visitor-arrival");
const visitorClue = document.querySelector("#visitor-clue");

function showVisitor() {
  const visitor = visitors[currentVisitor];
  visitorName.textContent = visitor.name;
  visitorArrival.textContent = visitor.arrival;
  visitorClue.textContent = "“" + visitor.clue + "”";

  selectedItem = null;
  answered = false;

  inspection.textContent = "Pick an item to read its label.";
  feedback.textContent = "";
  handOver.disabled = false;
  nextButton.hidden = true;

  const buttons = [keyA, keyB, keyC, keyD];
  const letters = ["A", "B", "C", "D"];

  for (let i = 0; i < buttons.length; i = i + 1) {
    buttons[i].disabled = false;
    buttons[i].textContent = "Inspect " + visitor.itemType + " " + letters[i];
  }
}
showVisitor();

nextButton.addEventListener("click", function () {
  if (!answered) {
    return;
  }
  if (currentVisitor === visitors.length - 1) {
    feedback.textContent = "That's everyone we've added so far.";
    nextButton.disabled = true;
    return;
  }
  currentVisitor = currentVisitor + 1;
  showVisitor();
});
