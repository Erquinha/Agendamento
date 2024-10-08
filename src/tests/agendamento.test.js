const db = require('../db/dbConnection.js')

describe('CRUD de Agendamentos', () => {
  let idAgenda; // Variável para armazenar o ID do agendamento inserido

  beforeAll(async () => {
    // Criar a tabela se não existir
    await db.query(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        id_agenda INT AUTO_INCREMENT PRIMARY KEY,
        nome_pessoa VARCHAR(255) NOT NULL,
        contato_telefonico VARCHAR(15) NOT NULL,
        email VARCHAR(255) NOT NULL,
        data_agendamento DATE NOT NULL
      )
    `);
  });

  afterAll(async () => {
    await db.query('DELETE FROM agendamentos'); // Limpar a tabela
    await db.end(); // Encerrar a conexão com o banco
  });

  test('Inserção - Verifique se um novo agendamento pode ser criado', async () => {
    const [result] = await db.query(
      'INSERT INTO agendamentos (nome_pessoa, contato_telefonico, email, data_agendamento) VALUES (?, ?, ?, ?)',
      ['João', '123456789', 'joao@example.com', '2024-10-05']
    );

    idAgenda = result.insertId; // Armazena o ID do agendamento inserido
    expect(result.affectedRows).toBe(1);
  });

  test('Leitura - Verifique se o agendamento pode ser lido', async () => {
    const [rows] = await db.query('SELECT * FROM agendamentos WHERE id_agenda = ?', [idAgenda]);
    expect(rows.length).toBe(1);
    expect(rows[0].nome_pessoa).toBe('João');
    expect(rows[0].contato_telefonico).toBe('123456789');
    expect(rows[0].email).toBe('joao@example.com');
    expect(rows[0].data_agendamento).toBe('2024-10-05');
  });

  test('Leitura - Selecionar por parte do nome', async () => {
    const [rows] = await db.query('SELECT * FROM agendamentos WHERE nome_pessoa LIKE ?', ['Jo%']);
    expect(rows.length).toBe(1);
    expect(rows[0].nome_pessoa).toBe('João');
  });

  test('Leitura - Selecionar por intervalo de datas', async () => {
    const [rows] = await db.query('SELECT * FROM agendamentos WHERE data_agendamento BETWEEN ? AND ?', ['2024-10-01', '2024-10-10']);
    expect(rows.length).toBe(1);
    expect(rows[0].nome_pessoa).toBe('João');
  });

  test('Atualização - Verifique se um agendamento pode ser atualizado', async () => {
    const [result] = await db.query(
      'UPDATE agendamentos SET nome_pessoa = ?, contato_telefonico = ? WHERE id_agenda = ?',
      ['Maria', '987654321', idAgenda]
    );
    expect(result.affectedRows).toBe(1);

    // Verifique se as alterações foram aplicadas
    const [rows] = await db.query('SELECT * FROM agendamentos WHERE id_agenda = ?', [idAgenda]);
    expect(rows[0].nome_pessoa).toBe('Maria');
    expect(rows[0].contato_telefonico).toBe('987654321');
  });

  test('Deleção - Verifique se um agendamento pode ser deletado', async () => {
    const [result] = await db.query('DELETE FROM agendamentos WHERE id_agenda = ?', [idAgenda]);
    expect(result.affectedRows).toBe(1);

    // Verifique se o agendamento foi realmente deletado
    const [rows] = await db.query('SELECT * FROM agendamentos WHERE id_agenda = ?', [idAgenda]);
    expect(rows.length).toBe(0);
  });
});
module.exports = agendamento;