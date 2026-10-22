const visitors = [
  {
    hint: "A luggage locker, dear. Downstairs. The number on the key should be 06.",
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
    hint: "Green glass, with a crack down the side. The new one isn't mine.",
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
  {
    hint: "Silver, twenty past twelve, and E. V. Those are my daughter's initials, not mine.",
    name: "Mr. Vale, station master",
    arrival: "He straightens a tie that isn't there. 'Quickly, please.'",
    clue: "My silver watch stopped when the last train left: twenty past twelve. My daughter's initials are on the back. E. V. She hated that I was always working.",
    itemType: "Watch",
    answer: "key-d",
    reply:
      "He holds it to his ear. 'Still time, then.' Somewhere outside, you hear a train.",
    reason:
      "His watch was silver, stopped at 12:20, and engraved E. V. Only D matches all three.",
    items: [
      "Silver. Stopped at 12:00. E. V. engraved on the back.",
      "Gold. Stopped at 12:20. E. V. engraved on the back.",
      "Silver. Stopped at 12:20. M. V. engraved on the back.",
      "Silver. Stopped at 12:20. E. V. engraved on the back.",
    ],
  },
  {
    hint: "Mara. M-A-R-A. Underneath a blue box with a moon. If anythiing is different, it isn't mine.",
    name: "The woman without a ticket",
    arrival:
      "The desk bell never rang. You're not sure how long she's been standing there.",
    clue: "A little music box. Blue lid. A moon on top. My name, Mara, scratched underneath. Please check properly.",
    itemType: "Music box",
    answer: null,
    reply:
      "'oh.' She looks almost relieved. 'Then I haven't been here before.' She leaves through the wall.",
    reason: "None watched everything: blue lid, moon, and MARA underneath.",
    items: [
      "Blue lid with a moon. MIRA scratched underneath.",
      "Red lid with a moon. MARA scratched underneath.",
      "Blue lid with a moon. Underside is blank.",
      "Blue lid with a star. MARA scrathched underneath.",
    ],
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
const turnAway = document.querySelector("#turn-away");

keyA.addEventListener("click", function () {
  selectedItem = "key-a";
  highlightSelection();
  inspection.textContent = visitors[currentVisitor].items[0];
});
keyB.addEventListener("click", function () {
  selectedItem = "key-b";
  highlightSelection();
  inspection.textContent = visitors[currentVisitor].items[1];
});
keyC.addEventListener("click", function () {
  selectedItem = "key-c";
  highlightSelection();
  inspection.textContent = visitors[currentVisitor].items[2];
});
keyD.addEventListener("click", function () {
  selectedItem = "key-d";
  highlightSelection();
  inspection.textContent = visitors[currentVisitor].items[3];
});

const handOver = document.querySelector("#hand-over");
const feedback = document.querySelector("#feedback");

function finishClaim(choice) {
  if (answered) {
    return;
  }
  answered = true;
  askButton.disabled = true;
  const visitor = visitors[currentVisitor];

  if (choice === visitor.answer) {
    score = score + 1;
    scoreDisplay.textContent = score;
    feedback.textContent = visitor.reply;
  } else {
    mistakes = mistakes + 1;
    mistakesDisplay.textContent = mistakes;
    feedback.textContent = visitor.reason;
  }
  handOver.disabled = true;
  turnAway.disabled = true;
  keyA.disabled = true;
  keyB.disabled = true;
  keyC.disabled = true;
  keyD.disabled = true;
  nextButton.hidden = false;
}
handOver.addEventListener("click", function () {
  if (selectedItem === null) {
    feedback.textContent = "Choose an item first.";
    return;
  }
  finishClaim(selectedItem);
});
const visitorName = document.querySelector("#visitor-name");
const visitorArrival = document.querySelector("#visitor-arrival");
const visitorClue = document.querySelector("#visitor-clue");

let questionsLeft = 2;
let asked = false;

const askButton = document.querySelector("#ask-question");
const extraClue = document.querySelector("#extra-clue");

function showVisitor() {
  const visitor = visitors[currentVisitor];
  visitorName.textContent = visitor.name;
  visitorArrival.textContent = visitor.arrival;
  visitorClue.textContent = "“" + visitor.clue + "”";

  selectedItem = null;
  highlightSelection();
  answered = false;
  asked = false;
  extraClue.textContent = "";

  askButton.textContent = "Ask one more thing (" + questionsLeft + " left)";
  askButton.disabled = questionsLeft === 0;

  inspection.textContent = "Pick an item to read its label.";
  feedback.textContent = "";
  handOver.disabled = false;
  turnAway.disabled = false;
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
  if (mistakes >= 3) {
    feedback.textContent =
      "Three wrong returns. Martin closes the window. " +
      "Claims sorted: " +
      score +
      ".";
    nextButton.disabled = true;
    return;
  }
  if (currentVisitor === visitors.length - 1) {
    if (score === visitors.length) {
      feedback.textContent =
        "Every claim sorted. You put the kettle on. " +
        "For once, nothing knocks on the glass.";
    } else {
      feedback.textContent =
        "You made it to morning. Claims sorted: " +
        score +
        " / " +
        visitors.length +
        ". You leave Martin a note.";
    }
    nextButton.disabled = true;
    return;
  }
  currentVisitor = currentVisitor + 1;
  showVisitor();
});

const restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", function () {
  currentVisitor = 0;
  score = 0;
  mistakes = 0;
  scoreDisplay.textContent = score;
  mistakesDisplay.textContent = mistakes;
  nextButton.disabled = false;
  questionsLeft = 2;
  showVisitor();
});
turnAway.addEventListener("click", function () {
  finishClaim(null);
});
function highlightSelection() {
  const buttons = [keyA, keyB, keyC, keyD];

  for (let i = 0; i < buttons.length; i = i + 1) {
    const isSelected = buttons[i].id === selectedItem;
    buttons[i].setAttribute("aria-pressed", isSelected);
  }
}
askButton.addEventListener("click", function () {
  if (answered || asked || questionsLeft === 0) {
    return;
  }
  questionsLeft = questionsLeft - 1;
  asked = true;

  extraClue.textContent = "“" + visitors[currentVisitor].hint + "”";
  askButton.textContent = "Ask one more thing (" + questionsLeft + " left)";
  askButton.disabled = true;
});
