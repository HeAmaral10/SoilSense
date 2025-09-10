function handleLogin(email, senha) {
  return async () => {
    if (!email || !senha) {
      console.log('Preencha todos os campos!');
      return;
    }

    // Simulação de "usuários cadastrados"
    const usuarios = [
      { email: 'teste@teste.com', senha: '1234' },
      { email: 'admin@admin.com', senha: 'admin' }
    ];

    try {
      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuario) {
        console.log('Login realizado!');
      } else {
        console.log('Email ou senha inválidos.');
      }
    } catch (error) {
      console.log('Erro de conexão', error.message);
    }
  };
}

module.exports = handleLogin;