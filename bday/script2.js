document.addEventListener('DOMContentLoaded', () => {
  const REQUIRED_CLICKS = 5;
  let clickCount = 0;

  const giftEl      = document.getElementById('gift');
  const cardEl      = document.getElementById('card');
  const clickSound  = document.getElementById('click-sound');
  const bgMusic     = document.getElementById('bg-music');
  const textEl     = document.getElementById('card-text');
  const revealSound = document.getElementById('open-sound')

function startTypewriter() {
    const fullText = textEl.getAttribute('data-text');
    textEl.textContent = '';
    let idx = 0;
    const speed = 100; // ms per character

    function type() {
      if (idx < fullText.length) {
        textEl.textContent += fullText.charAt(idx);
        idx++;
        setTimeout(type, speed);
      } else {
        // remove the cursor once done
        textEl.style.borderRight = 'none';
      }
    }
    type();
  }

  giftEl.addEventListener('click', () => {
    // play click fx (rewind in case it’s still ringing)
    clickSound.currentTime = 0;
    clickSound.play();

    clickCount++;
    // optional visual feedback (pop + glow from earlier)
    giftEl.classList.add('pop','glow');
    giftEl.addEventListener('animationend', e => {
      if (e.animationName === 'pop' || e.animationName === 'glow') {
        giftEl.classList.remove(e.animationName);
      }
    }, { once: true });

  if (clickCount >= REQUIRED_CLICKS) {
    revealSound.play();
    // 1) fade out the gift…
    giftEl.classList.add('fade-out');
    giftEl.addEventListener('transitionend', () => {
      // 2) once that's done, hide it for real
      giftEl.style.display = 'none';

      // 3) bring the card into layout, but still transparent
      cardEl.style.display = 'block';

      // 4) on the next frame, add 'visible' so opacity transitions to 1
        void cardEl.offsetWidth;
        cardEl.classList.add('visible');
      

      // 5) start your background music
      bgMusic.play();
    }, { once: true });
  }
  });
});
