// --- STEP SWITCHING ---
function goToStep(step) {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById("step" + step).classList.remove("hidden");

  if (step === 5) startGame();
}
 
// --- RUNAWAY NO BUTTON ---
const noBtn = document.getElementById("noBtn");

if (noBtn) {

  // Kabur saat mouse mendekat
  noBtn.addEventListener("mouseover", function () {
    const x = Math.random() * window.innerWidth * 0.7;
    const y = Math.random() * window.innerHeight * 0.7;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  // Kabur saat diclick (tidak bisa dipencet)
  noBtn.addEventListener("click", function (e) {
    e.preventDefault(); // mencegah klik berfungsi

    const x = Math.random() * window.innerWidth * 0.7;
    const y = Math.random() * window.innerHeight * 0.7;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });
}

// --- MINI GAME: CATCH 5 KEPALA + BOMB ---
let score = 0;
let gameOver = false;

function startGame() {
  const area = document.getElementById("gameArea");
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "0 / 5";
  

  const interval = setInterval(() => {

    if (gameOver) {
      clearInterval(interval);
      return;
    }

    const heart = document.createElement("div");
    heart.classList.add("poto");

    // 70% kepala, 30% bom
    const isBomb = Math.random() < 0.6;

    if (isBomb) {
      heart.innerHTML = `<img src="bom.png" class="bomimg">`;
      heart.dataset.type = "bom";
    } else {
      heart.innerHTML = `<img src="boy.jpg" class="potoimg">`;
      heart.dataset.type = "kepala";
    }

    const x = Math.random() * (area.clientWidth - 30);
    const y = Math.random() * (area.clientHeight - 30);

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.onclick = () => {

      // Kena BOM
      if (heart.dataset.type === "bom") {
        gameOver = true;
        clearInterval(interval);
        showGameOver();
        return;
      }

      // Klik kepala
      heart.remove();
      score++;
      document.getElementById("score").innerText = score + " / 5";

      if (score >= 5) {
        gameOver = true;
        clearInterval(interval);
        setTimeout(() => goToStep(6), 700);
      }
    };

    area.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);

  }, 900);
}

// --- GAME OVER SCREEN ---
function showGameOver() {
  document.getElementById("gameOverScreen").style.display = "flex";
}

function restartGame() {
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("gameArea").innerHTML = "";
  startGame();
}

// --- FINAL ACCEPTED ---
function accepted() {
  goToStep(7);
}



