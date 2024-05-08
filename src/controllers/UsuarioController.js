const Usuario = require("../models/Usuario");
// const bcrypt = require('bcrypt');
// // Hash da senha


class UsuarioController {

    // Cadastrar usuários
    async cadastrar(req, res) {
        try {
            const { nome, data_nascimento, sexo, cpf, cep, endereco, email, password } = req.body;
            if (!nome || !data_nascimento || !sexo || !cpf || !cep || !endereco || !email || !password) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            }
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/)) {
                return res.status(400).json({ message: 'A data de nascimento não está no formato correto' });
            }
            const usuario = await Usuario.create({
                nome: nome,
                data_nascimento: data_nascimento,
                sexo: sexo,
                cpf: cpf,
                cep: cep,
                endereco: endereco,
                email: email,
                password: password // A senha será hasheada pelo hook beforeSave no modelo
            });
            res.status(201).json(usuario);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o usuário' });
        }
    }

    // Listar todos usuários
    async listar(req, res) {
        try {
            const usuarios = await Usuario.findAll()
            res.json(usuarios)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Não foi possível listar os usuários'})
        }
    }

    // Listar um usuário específico por ID
    async listarUm(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" })
            }

            res.json(usuario)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({
                error: 'Não foi possível listar o usuário especificado'
            })
        }
    }

    // Atualizar um usuário
    async atualizar(req, res) {
        try {
            const { id } = req.params
            const { nome, data_nascimento, sexo, cpf, endereco, email, password } = req.body

            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado!' })
            }
            await usuario.update({
                nome: nome,
                data_nascimento: data_nascimento,
                sexo: sexo,
                cpf: cpf,
                cep: cep,
                endereco: endereco,
                email: email,
                password: password
            })
            res.json({ message: 'Usuário atualizado com sucesso!', usuario })

        } catch (error) {
            console.error(500).json({ error: 'Não foi possível atualizar o usuário' })
        }
    }

    // Deletar um usuário
    async deletar(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" })
            }

            await usuario.destroy()
            res.json({ message: 'Usuário deletado com sucesso!' })
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Não foi possível deletar o usuário' })
        }
    }
}

module.exports = new UsuarioController