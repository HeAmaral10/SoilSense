const handleLogin = require('./handleLogin');

describe('handleLogin', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('mostra aviso se campos estiverem vazios', async () => {
    const login = handleLogin('', '');
    await login();

    expect(consoleSpy).toHaveBeenCalledWith('Preencha todos os campos!');
  });

  test('login realizado com sucesso (usuário válido)', async () => {
    const login = handleLogin('teste@teste.com', '1234');
    await login();

    expect(consoleSpy).toHaveBeenCalledWith('Login realizado!');
  });

  test('email ou senha inválidos (usuário inexistente)', async () => {
    const login = handleLogin('x', 'y');
    await login();

    expect(consoleSpy).toHaveBeenCalledWith('Email ou senha inválidos.');
  });
});
