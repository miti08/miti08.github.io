// state
let stage = 0;
const maxStage = 3;

// elements
const giftImg = document.getElementById('gift-box');
const container = document.getElementById('gift-container');
const card = document.getElementById('card-content');
const bgMusic = document.getElementById('bg-music');
const clickSnd = document.getElementById('click-sound');
const openSnd = document.getElementById('open-sound');

// preload images
const frames = [];
for (let i = 0; i <= maxStage; i++) {
  const img = new Image();
  img.src = `assets/images/gift-${i}.png`;
  frames.push(img);
}

// click handler
container.addEventListener('click', () => {
  // start music on first interaction
  if (stage === 0) bgMusic.play().catch(() => { /* ignore if blocked */ });

  clickSnd.currentTime = 0;
  clickSnd.play();

  if (stage < maxStage) {
    stage++;
    giftImg.src = frames[stage].src;

    if (stage === maxStage) {
      // final open
      openSnd.play();
      setTimeout(() => {
        card.classList.add('visible');
      }, 800);
    }
  }
});
