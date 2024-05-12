const Usuario = require("../models/Usuario");
// const bcrypt = require('bcrypt');
// Hash da senha


class UsuarioController {

    // Cadastrar usuários
    async cadastrar(req, res) {
   /*  
    #swagger.tags = ['Usuário']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Adiciona um novo usuário',
        required: true,
        schema: {
            $nome: 'Seu Nome Aqui',
            $data_nascimento: 'YYYY-MM-DD',
            $sexo: 'Feminino',
            $cpf: '01234567890',
            $cep: '88888-888',
            $endereco: 'Seu Endereço Aqui',
            $email: 'seu.email@aqui.com',
            $password: 'SuaSenhaSegura123'
        }
    }
    #swagger.responses[201] = { 
        description: 'Usuário criado com sucesso.',
        schema: {
            $id: 1,
            $nome: 'Seu Nome Aqui',
            $data_nascimento: 'YYYY-MM-DD',
            $sexo: 'Feminino',
            $cpf: '01234567890',
            $cep: '88888-888',
            $endereco: 'Seu Endereço Aqui',
            $email: 'seu.email@aqui.com',
            $password: 'SuaSenhaSegura123'
        }
    }
    #swagger.responses[400] = { 
        description: 'Erro de validação ou dados incompletos.',
        schema: {
            $message: 'Todos os campos são obrigatórios'
        }
    }
    #swagger.responses[500] = {
        description: 'Erro interno do servidor.',
        schema: {
            $error: 'Não foi possível cadastrar o usuário'
        }
    }
*/

        try {
            // Verifica se todos os campos obrigatórios estão presentes
            const { nome, data_nascimento, sexo, cpf, cep, endereco, email, password } = req.body;
            if (!nome || !data_nascimento || !sexo || !cpf || !cep || !endereco || !email || !password) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            }
            // Verifica se a data de nascimento está no formato correto (AAAA-MM-DD)
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/)) {
                return res.status(400).json({ message: 'A data de nascimento não está no formato correto' });
            }
            // Cria um novo usuário no banco de dados
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
            // Retorna o usuário criado com status 201 (Criado)
            res.status(201).json(usuario);
        } catch (error) {
            // Log do erro e retorno de mensagem de falha
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o usuário' });
        }
    }

    // Listar todos usuários
    async listar(req, res) {
        /*  
    #swagger.tags = ['Usuário']
    #swagger.description = 'Endpoint para listar todos os usuários cadastrados'
    #swagger.responses[500] = {
        description: 'Erro interno do servidor.',
        schema: { $error: 'Não foi possível listar os usuários' }
    }
*/

        try {
            const usuarios = await Usuario.findAll()
            res.json(usuarios)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Não foi possível listar os usuários'})
        }
    }

    // Deletar um usuário
    async deletar(req, res) {
        /*  
    #swagger.tags = ['Usuário']
    #swagger.description = 'Endpoint para deletar um usuário pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: 'ID do usuário a ser deletado'
    }
    #swagger.responses[200] = {
        description: 'Usuário deletado com sucesso.',
        schema: { $message: 'Usuário deletado com sucesso!' }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado.',
        schema: { $message: 'Usuário não encontrado!' }
    }
    #swagger.responses[500] = {
        description: 'Erro ao deletar usuário.',
        schema: { $error: 'Não foi possível deletar o usuário' }
    }
*/

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