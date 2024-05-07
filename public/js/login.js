function login() {

  var email = inputEmail.value;
  var senha = inputPassword.value;

  if (email == "" || senha == "") {
    alert('Preencha os dados corretamente');
  }

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
        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.nome;
        sessionStorage.ID_USUARIO = json.id;
        // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
        window.location.replace('./home.html');
      });
      alert('SUCESSO');
    } else {
      alert("Houve um erro ao tentar realizar o login!");
    }
  })
  .catch(function (erro) {
    console.error('Erro na solicitação:', erro);
  });
  
}