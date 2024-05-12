'use strict';

const { QueryInterface, Sequelize } = require("sequelize");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (QueryInterface, Sequelize) {
    // Adicionando usuários
    await QueryInterface.bulkInsert("usuarios", [
      {
        nome: "Ana Beatriz",
        data_nascimento: "1995-01-25",
        sexo: "feminino",
        cpf: "66666666666",
        cep: "12345678",
        endereco: "Alameda das Rosas, 400",
        email: "anabea@gmail.com",
        password: "senha1234",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roberto Silva",
        data_nascimento: "1975-12-12",
        sexo: "masculino",
        cpf: "55555555555",
        cep: "87654321",
        endereco: "Praça Central, 105",
        email: "robsilva@gmail.com",
        password: "mypass123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Julia Martins",
        data_nascimento: "1990-08-15",
        sexo: "feminino",
        cpf: "88888888888",
        cep: "78965412",
        endereco: "Rua das Flores 123",
        email: "julia@gmail.com",
        password: "5207418",
        createdAt: new Date("2024-05-08T03:14:32.486Z"),
        updatedAt: new Date("2024-05-10T04:50:58.107Z")
      },
      {
        nome: "Carlos Andrade",
        data_nascimento: "1982-03-21",
        sexo: "masculino",
        cpf: "77777777777",
        cep: "45678901",
        endereco: "Avenida Paulista 1000",
        email: "carlos@gmail.com",
        password: "5207418",
        createdAt: new Date("2024-05-08T05:30:32.486Z"),
        updatedAt: new Date("2024-05-10T06:25:58.107Z")
      }
    ] );

    
  },

  async down (queryInterface, Sequelize) {
    // Remover todos os usuários 
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
