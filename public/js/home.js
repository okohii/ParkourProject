verificarSessao();

var fkParceiro = null;
var emailParceiro = '';

ScrollReveal().reveal('section', { delay: 300 });
ScrollReveal().reveal('h1', { delay: 1000 });
ScrollReveal().reveal('h2', { delay: 700 });
ScrollReveal().reveal('div', { delay: 500 });

function verificarSessao() {
  if (sessionStorage.idUsuario == undefined) {
    divBotao.innerHTML = '<button class="btnSair" onclick="entrar()"><p>LOGIN</p></button>';
    // window.location.href = 'http://localhost:3333/home.html';
  } else {
    divBotao.innerHTML = '<button class="btnSair" onclick="sair()"><p>SAIR</p></button>';
  }
}

function sair() {
  sessionStorage.clear();
  window.location.reload();
}

function entrar() {
  window.location.href = 'http://localhost:3333/login.html';
}


function redirectClassic() {
  var urlsClassic = ['https://www.youtube.com/watch?v=xbqVWZD-sfI&t=57s',
    'https://www.youtube.com/watch?v=vs-m_7rrVyA',
    'https://www.youtube.com/watch?v=Tm1dJNC3674',
    'https://www.youtube.com/watch?v=eMMLi_0jMgc',
    'https://www.youtube.com/watch?v=U5yHk3hY2MU',
    'https://www.youtube.com/watch?v=8eVQwHiuYq0'
  ];

  for (var i = 0; i < 3; i++) {
    var num = Math.floor(Math.random() * urlsClassic.length);

    window.open(`${urlsClassic[num]}`, "_blank");

  }

}

function redirectFreeRunning() {
  var urlsFreeRunning = ['https://www.youtube.com/watch?v=fqKO5fp4Fcc',
    'https://www.youtube.com/watch?v=NX7QNWEGcNI&t=32s',
    'https://www.youtube.com/watch?v=Mv7J2CLBYBk',
    'https://www.youtube.com/watch?v=hpTEzp-6CkM',
    'https://www.youtube.com/watch?v=HQKws9cbTJQ',
    'https://www.youtube.com/watch?v=lPQdPHP32CY'
  ];

  for (var i = 0; i < 3; i++) {
    var num = Math.floor(Math.random() * urlsFreeRunning.length);

    window.open(`${urlsFreeRunning[num]}`, "_blank");
  }

}

function redirectClimbing() {
  var urlsClimbing = ['https://www.youtube.com/watch?v=iKFwn-z9WIM&t=310s',
    'https://www.youtube.com/watch?v=OD4_NFJ9Da8',
    'https://www.youtube.com/watch?v=iF1g6KnP0-A&t=133s',
    'https://www.youtube.com/watch?v=UjcAdovYnzI',
    'https://www.youtube.com/watch?v=jzyFj88In2A',
    'https://www.youtube.com/watch?v=JNriVJPtTkI'];

  for (var i = 0; i < 3; i++) {
    var num = Math.floor(Math.random() * urlsClimbing.length);

    window.open(`${urlsClimbing[num]}`, "_blank");
  }

}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
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
  if (sessionStorage.idUsuario == undefined) {
    window.location.href = 'http://localhost:3333/login.html'
  } else {
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
          alert("VOCÊ JÁ VOTOU!");
        }
      })
      .catch(function (erro) {
        console.error('Erro na solicitação:', erro);
      });
  }
}

let votosClassic;
let votosFreeRunning;
let votosClimbing;

let votosLista = [votosClassic, votosFreeRunning, votosClimbing];

async function selectClassic(fkModalidade) {
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
          votosLista[0] = votosClassic;
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

async function selectFreeRunning(fkModalidade) {
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
          votosLista[1] = votosFreeRunning;
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

async function selectClimbing(fkModalidade) {
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
          votosLista[2] = votosClimbing;
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

    let maisVotada = 0;

    kpiClassic.innerHTML = valorClassic;
    kpiFreeRunning.innerHTML = valorFreeRunning;
    kpiClimbing.innerHTML = valorClimbing;
    kpiTotal.innerHTML = valorClassic + valorFreeRunning + valorClimbing;

    if (valorClassic > maisVotada) {
      maisVotada = valorClassic;
      modalidadeMaisVotada.innerHTML = `A MODALIDADE MAIS VOTADA FOI: CLASSIC`;
    }
    if (valorFreeRunning > maisVotada) {
      maisVotada = valorFreeRunning;
      modalidadeMaisVotada.innerHTML = `A MODALIDADE MAIS VOTADA FOI: FREE RUNNING`;
    }
    if (valorClimbing > maisVotada) {
      maisVotada = valorClimbing;
      modalidadeMaisVotada.innerHTML = `A MODALIDADE MAIS VOTADA FOI: CLIMBING`;
    }

    console.log(votosLista[0]);
    console.log(votosLista[1]);
    console.log(votosLista[2]);

    const ctx = document.getElementById('myChart');

    // if (Chart.getChart(ctx)) {
    //   Chart.getChart(ctx).destroy();
    // }

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