grafico.style.display = 'none';

function redirectClassic() {
  // window.location.href = "https://www.youtube.com/watch?v=xbqVWZD-sfI&t=57s";
  window.open("https://www.youtube.com/watch?v=xbqVWZD-sfI&t=57s", "_blank");
}

function redirectFreeRunning() {
  // window.location.href = "https://www.youtube.com/watch?v=fqKO5fp4Fcc";
  window.open("https://www.youtube.com/watch?v=fqKO5fp4Fcc", "_blank");
}

function redirectClimbing() {
  // window.location.href = "https://www.youtube.com/watch?v=iKFwn-z9WIM&t=310s";
  window.open("https://www.youtube.com/watch?v=iKFwn-z9WIM&t=310s", "_blank");
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        if (links.getAttribute('href').includes(id)) {
          links.classList.add('active');
        }
      });
    }
  });
}

function apagarCard() {
  cardDashClassic.style.display = 'none';
  cardDashFreeRunning.style.display = 'none';
  cardDashClimbing.style.display = 'none';
  grafico.style.display = 'flex';
}

function votarClassic() {
  classic.innerHTML = '●';
  setTimeout(() => apagarCard(), 1500);
}

function votarFreeRunning() {
  freeRunning.innerHTML = '●';
  setTimeout(() => apagarCard(), 1500);
}

function votarClimbing() {
  climbing.innerHTML = '●';
  setTimeout(() => apagarCard(), 1500);
}


const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'VOTOS DE CADA MODALIDADE',
        data: [12, 19, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


// document.addEventListener("DOMContentLoaded", function() {
//   var audio = document.getElementById("meuAudio");
//   audio.volume = 0.02;
//   audio.play();
// });