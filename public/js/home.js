ScrollReveal().reveal('section', { delay: 300 });
ScrollReveal().reveal('h1', { delay: 1000 });
ScrollReveal().reveal('h2', { delay: 700 });
ScrollReveal().reveal('div', { delay: 500 });

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

// function apagarCard() {
//   cardDashClassic.style.display = 'none';
//   cardDashFreeRunning.style.display = 'none';
//   cardDashClimbing.style.display = 'none';
//   grafico.style.display = 'flex';
// }

// function mostrarCard() {
//   cardDashClassic.style.display = 'flex';
//   cardDashFreeRunning.style.display = 'flex';
//   cardDashClimbing.style.display = 'flex';
//   classic.innerHTML = 'CLASSIC';
//   freeRunning.innerHTML = 'FREE RUNNING';
//   climbing.innerHTML = 'CLIMBING';
//   grafico.style.display = 'none';
// }


var voto = 0;
var id = sessionStorage.idUsuario;

function votarClassic() {
  voto = 1;
  sessionStorage.voto = voto;
  enviarVoto();
}

function votarFreeRunning() {
  voto = 2;
  sessionStorage.voto = voto;
  enviarVoto();
}

function votarClimbing() {
  voto = 3;
  sessionStorage.voto = voto;
  enviarVoto();
}

function enviarVoto() {
  fetch("/usuarios/votar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idServer: id,
      votoServer: voto
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(json => {
          console.log(json);
        });
        selectClassic();
        selectFreeRunning();
        selectClimbing();
        // if (voto === 1) document.getElementById('classic').innerHTML = '●';
        // if (voto === 2) document.getElementById('freeRunning').innerHTML = '●';
        // if (voto === 3) document.getElementById('climbing').innerHTML = '●';
        atualizarGrafico();
        location.reload()
        // setTimeout(() => apagarCard(), 1500);
      } else {
        alert("Houve um erro ao votar!");
      }
    })
    .catch(function (erro) {
      console.error('Erro na solicitação:', erro);
    });
}

let votosClassic;
let votosFreeRunning;
let votosClimbing;

let votosLista = [];

async function selectClassic() {
  return fetch("/usuarios/selectClassic", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (resposta) {
    console.log('passouClassic', resposta)
    if (resposta.ok) {
      return resposta.json().then(json => {
        console.log('Retorno json voteClassic: ', json);
        votosClassic = parseInt(json[0]['COUNT(fkModalidade)']);;  // Armazena o valor na variável global
        votosLista.push(votosClassic);
        console.log('votosClassic: ', votosClassic);
      });
    } else {
      alert("Houve um erro ao buscar os votos!");
    }
  })
  .catch(function (erro) {
    console.error('Erro na solicitação:', erro);
  });
}

async function selectFreeRunning() {
  return fetch("/usuarios/selectFreeRunning", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (resposta) {
    console.log('passouFreeRunning', resposta)
    if (resposta.ok) {
      return resposta.json().then(json => {
        console.log('Retorno json votosFreeRunning: ', json);
        votosFreeRunning = parseInt(json[0]['COUNT(fkModalidade)']);  // Armazena o valor na variável global
        votosLista.push(votosFreeRunning);
        console.log('votosFreeRunning: ', votosFreeRunning);
      });
    } else {
      alert("Houve um erro ao buscar os votos!");
    }
  })
  .catch(function (erro) {
    console.error('Erro na solicitação:', erro);
  });
}

async function selectClimbing() {
  return fetch("/usuarios/selectClimbing", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (resposta) {
    console.log('passouClimbing', resposta)
    if (resposta.ok) {
      return resposta.json().then(json => {
        console.log('Retorno json voteClimbing: ', json);
        votosClimbing = parseInt(json[0]['COUNT(fkModalidade)']);  // Armazena o valor na variável global
        votosLista.push(votosClimbing);
        console.log('votosClimbing: ', votosClimbing);
      });
    } else {
      alert("Houve um erro ao buscar os votos!");
    }
  })
  .catch(function (erro) {
    console.error('Erro na solicitação:', erro);
  });
}

atualizarGrafico();

function atualizarGrafico() {
  Promise.all([selectClassic(), selectFreeRunning(), selectClimbing()]).then(() => {
    let valorClassic = votosLista[0];
    let valorFreeRunning = votosLista[1];
    let valorClimbing = votosLista[2];

    console.log(votosLista[0]);
    console.log(votosLista[1]);
    console.log(votosLista[2]);

    const ctx = document.getElementById('myChart');

    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['MODALIDADE'],
        datasets: [{
          label: 'CLASSIC',
          data: [valorClassic],
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
          data: [valorFreeRunning],
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
          data: [valorClimbing],
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
  });
}



// document.addEventListener("DOMContentLoaded", function() {
//   var audio = document.getElementById("meuAudio");
//   audio.volume = 0.02;
//   audio.play();
// });