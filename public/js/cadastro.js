function cadastro() {
  var nome = inputNome.value;
  var email = inputEmail.value;
  var senha = inputPassword.value;
  var confirmarSenha = inputConfirmPassword.value;
  var arroba = email.indexOf('@');
  var ponto = email.indexOf('.');

  if(nome.length < 3) {
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
    alert(`Registrado com sucesso!`);
    window.location.replace('./login.html')

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nome,
        emailServer: email,
        senhaServer: senha
      }),
    })
  }
}