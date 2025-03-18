const bearEmoji = document.getElementById('bearEmoji');
const rabbitEmoji = document.getElementById('rabbitEmoji');
let bearAnimating = false;
let rabbitAnimating = false;

// Bear emoji animation
bearEmoji.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!bearAnimating) {
    animateBear();
  }
});

bearEmoji.addEventListener('click', () => {
  if (!bearAnimating) {
    animateBear();
  }
});

// Rabbit emoji animation
rabbitEmoji.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!rabbitAnimating) {
    animateRabbit();
  }
});

rabbitEmoji.addEventListener('click', () => {
  if (!rabbitAnimating) {
    animateRabbit();
  }
});

function animateBear() {
  bearAnimating = true;
  
  // Shake animation
  let count = 0;
  const shake = setInterval(() => {
    if (count % 2 === 0) {
      bearEmoji.style.transform = 'rotate(-5deg) scale(1.1)';
    } else {
      bearEmoji.style.transform = 'rotate(5deg) scale(1.1)';
    }
    count++;
    
    if (count > 5) {
      clearInterval(shake);
      bearEmoji.style.transform = 'rotate(0deg) scale(1)';
      bearAnimating = false;
    }
  }, 100);
}

function animateRabbit() {
  rabbitAnimating = true;
  
  // Shake animation - 与熊一样的效果
  let count = 0;
  const shake = setInterval(() => {
    if (count % 2 === 0) {
      rabbitEmoji.style.transform = 'rotate(-5deg) scale(1.1)';
    } else {
      rabbitEmoji.style.transform = 'rotate(5deg) scale(1.1)';
    }
    count++;
    
    if (count > 5) {
      clearInterval(shake);
      rabbitEmoji.style.transform = 'rotate(0deg) scale(1)';
      rabbitAnimating = false;
    }
  }, 100);
}

// Random decoration animation
const decorationElement = document.getElementById('decoration');
const decorations = ['✨', '🌸', '🌟', '💫', '🍭'];

setInterval(() => {
  const randomIndex = Math.floor(Math.random() * decorations.length);
  decorationElement.textContent = decorations[randomIndex];
}, 3000); 