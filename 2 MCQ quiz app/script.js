const url =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

let questionEl = document.querySelector("#question");
let optionsContainer = document.querySelector("#options");
let nextBtn = document.querySelector(".btn-success");

let currentQuestion = 0;
let questions = [];

// Shuffle function for options
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

async function getQns() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    questions = data.results;
    showQuestion();
  } catch (e) {
    console.log(e);
  }
}

// Show current question and options
function showQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("qNumber").innerText = `Question ${
    currentQuestion + 1
  } of ${questions.length}`;

  questionEl.innerHTML = q.question;

  // Combine correct and incorrect answers
  const allOptions = [...q.incorrect_answers, q.correct_answer];
  const shuffledOptions = shuffle(allOptions);

  // Clear old options
  optionsContainer.innerHTML = "";

  // Create option buttons
  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary d-block w-100 text-start mb-2";
    btn.innerHTML = opt;
    btn.onclick = () => checkAnswer(opt, q.correct_answer);
    optionsContainer.appendChild(btn);
  });
}

// Check if selected answer is correct
function checkAnswer(selected, correct) {
  if (selected === correct) {
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong! Correct answer: " + correct);
  }
}

// Go to next question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionEl.innerHTML = "🎉 Quiz Completed!";
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

// Start the quiz
getQns();
