url = "https://official-joke-api.appspot.com/jokes/random";
let question = document.querySelectorAll("#qs");
let answer = document.querySelectorAll("#ans");
let btn = document.querySelector(".btnAns");

// console.log(question[0].innerText);
//  console.log(answer[0].innerText);

async function joke() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    let qs = data.setup;
    question[0].innerText = qs;

    btn.addEventListener("click", () => {
      let ans = data.punchline;
      answer[0].innerText = ans;
    });

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
