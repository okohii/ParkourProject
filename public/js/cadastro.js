async function cadastro() {
  var nome = inputNome.value;
  var email = inputEmail.value;
  var senha = inputPassword.value;
  var confirmarSenha = inputConfirmPassword.value;


  var arroba = email.indexOf('@');
  var ponto = email.indexOf('.');

  if (nome.length < 3) {
    inputNome.value = '';
    inputNome.placeholder = 'Nome muito curto';
  } else if (arroba == -1 || ponto == -1) {
    inputEmail.value = '';
    inputEmail.placeholder = 'Email inválido.';
  } else if (senha.length < 8) {
    inputPassword.value = '';
    inputPassword.placeholder = 'Senha muito fraca.';
  } else if (senha != confirmarSenha) {
    inputConfirmPassword.value = '';
    inputConfirmPassword.placeholder = 'As senhas não correspondem.';
  } else {
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nome,
        emailServer: email,
        senhaServer: senha
      }),
    })
      .then(function (resposta) {
        console.log('ESTOU NO THEN CADASTRAR()"');
        if (resposta.ok) {
          Swal.fire({
            title: "SUCESSO",
            text: "REGISTRADO COM SUCESSO!",
            icon: "success",
            color: "#E32D60",
            background: "#031019",
            showConfirmButton: false,
          });
          setTimeout(() => {window.location.replace('./login.html');}, "1500");
        } else {
          inputEmail.value = '';
          inputEmail.placeholder = 'Email ja cadastrado!';
        }
      })
  }
}