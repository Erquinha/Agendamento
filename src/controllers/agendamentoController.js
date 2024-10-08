const db = require('../db/dbConnection');

// Inserir um novo agendamento
const inserirAgendamento = async (nome, contato, email, data) => {
  const [result] = await db.query(
    `INSERT INTO agendamentos (nome_pessoa, contato_telefonico, email, data_agendamento) 
     VALUES (?, ?, ?, ?)`, [nome, contato, email, data]
  );
  return result;
};

// Selecionar todos os agendamentos
const selecionarTodosAgendamentos = async () => {
  const [rows] = await db.query('SELECT * FROM agendamentos');
  
  return rows;
};

// Selecionar agendamentos por nome
const selecionarPorNome = async (nome) => {
  const [rows] = await db.query('SELECT * FROM agendamentos WHERE nome_pessoa = ?', [nome]);
  return rows;
};

// Atualizar um agendamento
const atualizarAgendamento = async (id, novoContato) => {
  const [result] = await db.query(
    'UPDATE agendamentos SET contato_telefonico = ? WHERE id_agenda = ?', [novoContato, id]
  );
  return result;
};

// Deletar um agendamento
const deletarAgendamento = async (id) => {
  const [result] = await db.query('DELETE FROM agendamentos WHERE id_agenda = ?', [id]);
  return result;
};

module.exports = {
  inserirAgendamento,
  selecionarTodosAgendamentos,
  selecionarPorNome,
  atualizarAgendamento,
  deletarAgendamento,
};
