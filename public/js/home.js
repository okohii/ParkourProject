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

function mostrarCard() {
  cardDashClassic.style.display = 'flex';
  cardDashFreeRunning.style.display = 'flex';
  cardDashClimbing.style.display = 'flex';
  classic.innerHTML = 'CLASSIC';
  freeRunning.innerHTML = 'FREE RUNNING';
  climbing.innerHTML = 'CLIMBING';
  grafico.style.display = 'none';
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
      labels: ['MODALIDADE'],
      datasets: [{
        label: 'CLASSIC',
        data: [12],
        borderWidth: 1,
        backgroundColor: [
          '#E32D60', // Cor da primeira barra (CLASSIC)
        ],
        borderColor: [
          '#E32D60',   // Cor da borda da primeira barra (CLASSIC)
        ],
      },
      {
        label: 'FREE RUNNING',
        data: [19],
        borderWidth: 1,
        backgroundColor: [
          '#E0E330',  // Cor da segunda barra (FREE RUNNING)
        ],
        borderColor: [
          '#E0E330',   // Cor da borda da segunda barra (FREE RUNNING)
        ],
      },
      {
        label: 'CLIMBING',
        data: [3],
        borderWidth: 1,
        backgroundColor: [
          '#CA440f'   // Cor da terceira barra (CLIMBING)
        ],
        borderColor: [
          '#CA440F'    // Cor da borda da terceira barra (CLIMBING)
        ],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          fontSize: 10
        }
      }
    }
  });


// document.addEventListener("DOMContentLoaded", function() {
//   var audio = document.getElementById("meuAudio");
//   audio.volume = 0.02;
//   audio.play();
// });