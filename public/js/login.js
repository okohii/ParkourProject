function login() {
  
  var email = inputEmail.value;
  var senha = inputPassword.value;

  console.log("FORM LOGIN: ", email);
  console.log("FORM SENHA: ", senha);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: email,
      senhaServer: senha
    })
  })
  .then(function (resposta) {
    console.log('passou')
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        sessionStorage.emailUsuario = json.emailUsuario;
        sessionStorage.nomeUsuario = json.nomeUsuario;
        sessionStorage.idUsuario = json.idUsuario;
        setTimeout(() => {window.location.replace('./home.html');}, "1500");
      });
      Swal.fire({
        title: "SUCESSO",
        text: "AUTENTICADO COM SUCESSO!",
        icon: "success",
        showConfirmButton: false,
        color: "#E32D60",
        background: "#031019",
      });
    } else {
      Swal.fire({
        title: "ERRO",
        text: "HOUVE UM ERRO AO TENTAR REALIZAR O LOGIN!",
        icon: "error",
        color: "#E32D60",
        background: "#031019",
        confirmButtonColor: "#E32D60"
      });
    }
  })
  .catch(function (erro) {
    console.error('Erro na solicitação:', erro);
  });
  
}