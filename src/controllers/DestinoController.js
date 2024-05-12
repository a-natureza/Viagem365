const Destino = require("../models/Destino")
const axios = require('axios')
const yup = require('yup')
const { verify } = require('jsonwebtoken')

const destinoSchema = yup.object().shape({
    usuario_id: yup.number().required('Usuário é obrigatório'),
    nome_local: yup.string().required('Nome do local é obrigatório').max(255),
    descricao: yup.string().required('Descrição é obrigatória').max(500),
    cep: yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'Formato de CEP inválido'),
    localidade: yup.string().required('Localidade é obrigatória').max(255)
    
});

class DestinoController {

    async cadastrar(req, res) {
/*  #swagger.tags = ['Destino']
    #swagger.description = 'Endpoint para cadastrar um novo destino. Requer dados como nome do local, descrição, CEP e localidade. As coordenadas latitude e longitude são calculadas automaticamente com base no CEP fornecido.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados do destino a ser cadastrado.',
        required: true,
        schema: {
            $usuario_id: 'ID do usuário que está cadastrando o destino',
            $nome_local: 'Nome do local do destino',
            $descricao: 'Descrição detalhada do destino',
            $localidade: 'Localidade do destino',
            $cep: 'CEP do local do destino',
            latitude: 'Latitude geográfica obtida através do CEP. Este campo é calculado automaticamente',
            longitude: 'Longitude geográfica obtida através do CEP. Este campo é calculado automaticamente'
        }
    }
    #swagger.responses[404] = {
        description: 'CEP não encontrado.',
        schema: { error: 'CEP não encontrado' }
    }
    #swagger.responses[500] = {
        description: 'Erro ao processar a solicitação.',
        schema: { error: 'Erro ao processar a solicitação' }
    }
*/

        const { usuario_id, nome_local, descricao, cep, localidade } = req.body;

        try {
            // Validação dos dados de entrada usando Yup
            await destinoSchema.validate(req.body, { abortEarly: false });

            // Consulta o CEP na API Nominatim para obter as coordenadas
            const response = await axios.get(`https://nominatim.openstreetmap.org/search.php?${cep}&country=Brazil&limit=1&format=jsonv2`)
        console.log(response.data)
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                console.log(lat, lon)
                // Criação do novo destino no banco de dados
                const novoDestino = await Destino.create({
                    usuario_id,
                    nome_local,
                    descricao,
                    localidade,
                    cep,
                    latitude: lat,
                    longitude: lon
                });

                // Envio da resposta com o novo destino
                res.status(201).json(novoDestino);
            } else {
                // Caso nenhum resultado seja encontrado para o CEP
                res.status(404).json({ error: 'CEP não encontrado' });
            }
        } catch (error) {
            // Manipulação de erros de validação e outros erros
            if (error.name === 'ValidationError') {
                res.status(400).json({ error: error.errors });
            } else {
                console.error('Erro ao consultar o CEP ou ao salvar no banco:', error);
                res.status(500).json({ error: 'Erro ao processar a solicitação' });
            }
        }
    }

    async listar(req, res) {
/*  #swagger.tags = ['Destino']
    #swagger.description = 'Endpoint para listar todos os destinos associados ao usuário autenticado.'
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    #swagger.responses[200] = { 
        description: 'Listagem de destinos realizada com sucesso.',
        schema: [{ $ref: '#/definitions/Destino' }]
    }
    #swagger.responses[500] = { 
        description: 'Erro interno ao tentar listar os destinos.'
    }
*/

        try {
            // token
            const { authorization } = req.headers
            const token = verify(authorization, process.env.SECRET_JWT)
            console.log(token.sub)
            const destinos = await Destino.findAll({
                where: {
                    usuario_id: token.sub
                }
            });
            res.json(destinos);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar os destinos' });
        }
    }

    async listarUm(req, res) {
/*  #swagger.tags = ['Destino']
    #swagger.description = 'Endpoint para recuperar um destino específico, se o usuário autenticado for o dono.'
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do destino a ser recuperado',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = { 
        description: 'Destino recuperado com sucesso.',
        schema: { $ref: '#/definitions/Destino' }
    }
    #swagger.responses[401] = { 
        description: 'Usuário não autorizado para acessar esse recurso.'
    }
    #swagger.responses[500] = { 
        description: 'Erro interno ao tentar recuperar o destino.'
    }
*/
        try {
            // token
            const { authorization } = req.headers
            const token = verify(authorization, process.env.SECRET_JWT)
            console.log(token.sub)
            const destinos = await Destino.findByPk(req.params.id)
            if (token.sub == destinos.usuario_id) {
                return res.status(200).json(destinos)
            }
            return res.status(401).json({ message: 'Você não tem permissão para acessar esse recurso' })
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar os destinos' });
        }
    }

    async atualizar(req, res) {
/*  #swagger.tags = ['Destino']
    #swagger.description = 'Endpoint para atualizar os dados de um destino existente, se o usuário autenticado for o dono.'
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do destino a ser atualizado',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados para atualização do destino',
        required: true,
        schema: {
            $usuario_id: 'ID do usuário que cadastrou o destino',
            $nome_local: 'Nome do local do destino',
            $descricao: 'Descrição detalhada do destino',
            $localidade: 'Localidade do destino',
            $cep: 'CEP do local do destino'
        }
    }
    #swagger.responses[200] = { 
        description: 'Destino atualizado com sucesso.',
        schema: { $ref: '#/definitions/Destino' }
    }
    #swagger.responses[401] = { 
        description: 'Usuário não autorizado para acessar esse recurso.'
    }
    #swagger.responses[404] = { 
        description: 'Destino não encontrado.'
    }
    #swagger.responses[500] = { 
        description: 'Erro interno ao tentar atualizar o destino.'
    }
*/

        try {
            const { authorization } = req.headers
            const token = verify(authorization, process.env.SECRET_JWT)
            const destino = await Destino.findByPk(req.params.id)
            if (!destino) {
                return res.status(404).json({ message: 'Destino não encontrado!' })
            }
            if (token.sub !== destino.usuario_id) {
                return res.status(401).json({ message: 'Você não tem permissão para acessar esse recurso' })
            }
            const { nome_local, descricao, cep, localidade, latitude, longitude } = req.body
            
            await destino.update({
                nome_local,
                descricao,
                cep,
                localidade,
                latitude,
                longitude
            });
            return res.json({ message: 'Destino atualizado com sucesso!', destino });
               
        } catch (error) {
            console.error('Erro ao atualizar destino:', error);
            res.status(500).json({ error: 'Não foi possível atualizar o destino' });
        }
    }

    async deletar(req, res) {
/*  #swagger.tags = ['Destino']
    #swagger.description = 'Endpoint para deletar um destino, se o usuário autenticado for o dono.'
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do destino a ser deletado',
        required: true,
        type: 'integer'
    }
    #swagger.responses[204] = { 
        description: 'Destino deletado com sucesso.'
    }
    #swagger.responses[401] = { 
        description: 'Usuário não autorizado para deletar esse recurso.'
    }
    #swagger.responses[404] = { 
        description: 'Destino não encontrado.'
    }
    #swagger.responses[500] = { 
        description: 'Erro interno ao tentar deletar o destino.'
    }
*/

        try {
            const { authorization } = req.headers
            const token = verify(authorization, process.env.SECRET_JWT)
            const destino = await Destino.findByPk(req.params.id)
            if (!destino) {
                return res.status(404).json({ message: 'Destino não encontrado!' })
            }
            if (token.sub !== destino.usuario_id) {
                return res.status(401).json({ message: 'Você não tem permissão para deletar esse destino' })
            }
            await Destino.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(204).send()
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível deletar o destino' })
        }
    }
}

module.exports = new DestinoController();
