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


var voto = 0;
var id = sessionStorage.idUsuario;

function votarClassic() {
  voto = 1;
  sessionStorage.voto = voto;
  console.log('voto', voto);
  console.log('id', id);

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
  console.log('passou', resposta)
  if (resposta.ok) {
    console.log(resposta);
    resposta.json().then(json => {
      console.log("NA PROXIMA DA CONSOLE.LOG", json)
      console.log(sessionStorage)
    });
    alert('SUCESSO');
    classic.innerHTML = '●';
    setTimeout(() => apagarCard(), 1500);
  } else {
    alert("Houve um erro ao votar!");
  }
})
.catch(function (erro) {
  console.error('Erro na solicitação:', erro);
});
}

function votarFreeRunning() {
  voto = 2;
  sessionStorage.voto = voto;
  
  freeRunning.innerHTML = '●';
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
    console.log('passou', resposta)
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(sessionStorage)
      });
      alert('SUCESSO');
      classic.innerHTML = '●';
      setTimeout(() => apagarCard(), 1500);
    } else {
      alert("Houve um erro ao votar!");
    }
  })
  .catch(function (erro) {
    console.error('Erro na solicitação:', erro);
  });
}

function votarClimbing() {
  voto = 3;
  sessionStorage.voto = voto;
  console.log('voto', voto);
  console.log('id', id);  

  climbing.innerHTML = '●';
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
    console.log('passou', resposta)
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
      });
      alert('SUCESSO');
      classic.innerHTML = '●';
      setTimeout(() => apagarCard(), 1500);
    } else {
      alert("Houve um erro ao votar!");
    }
  })
  .catch(function (erro) {
    console.error('Erro na solicitação:', erro);
  });
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