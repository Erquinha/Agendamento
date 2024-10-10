const { getUserById, connection } = require('./db');


describe('Testes para getUserById', () => {

  // Criar uma tabela nova no banco de dados com o nome "agendamento" caso não exista
  beforeAll(async () => {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS agendamento (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_pessoa VARCHAR(255),
        contato VARCHAR(20),
        email VARCHAR(255),
        data_agendamento VARCHAR(20)
      )
    `);
    // Inserir um registro inicial
    await connection.query(`
      INSERT INTO agendamento (nome_pessoa, contato, email, data_agendamento) 
      VALUES ('Erica Marques', '7555369997855', 'email@email.com', '2024-10-30')
    `);
  });

  // Limpeza e fechamento da conexão após os testes
  afterAll(async () => {
    //await connection.query("TRUNCATE TABLE agendamento"); // Limpar dados se necessário
    await connection.end();
  });

  // Teste 1: Verificar leitura de dados pelo ID
  test('deve retornar o usuário correto pelo id', async () => {
    const inicio = performance.now();
    const user = await getUserById(1); // Certifique-se de que está buscando o ID correto
    const fim = performance.now();

    const duracao = fim - inicio;
    console.log(`Tempo de execução: ${duracao.toFixed(2)} ms`);
    expect(duracao).toBeLessThanOrEqual(100);

    expect(user).toHaveProperty('nome_pessoa', 'Erica Linda');
    expect(user).toHaveProperty('contato', '7555369997855');
    expect(user).toHaveProperty('email', 'email@email.com');
    expect(user).toHaveProperty('data_agendamento', '2024-10-30');

    console.log(`Usuário: `, user);
  });

  // Teste 2: Verificar tempo de resposta do getUserById
  test('Verificar se getUserById responde em menos de 50ms', async () => {
    const inicio = performance.now();
    await getUserById(1); // Certifique-se de que está buscando o ID correto
    const fim = performance.now();

    const duracao = fim - inicio;
    console.log(`Tempo de execução: ${duracao.toFixed(2)} ms`);
    expect(duracao).toBeLessThanOrEqual(50);
  });

  // Teste 3: Atualização de agendamento
  test('Atualização de agendamento', async () => {
    // Atualizar um registro
    const [result] = await connection.execute(
      'UPDATE agendamento SET nome_pessoa = ? WHERE id = ?',
      ['Erica Linda', 1] // Certifique-se de que o ID 1 existe
    );

    expect(result.affectedRows).toBe(1);

    const updateUser = await getUserById(1);
    expect(updateUser).toHaveProperty('nome_pessoa', 'Erica Linda');
  });

  // Teste 4: Verificar se parte do nome está presente
  test('verifica se parte do nome está presente', async () => {
    const agendamento = await getUserById(1);
    expect(agendamento.nome_pessoa).toMatch(/Erica/);
  });

});
