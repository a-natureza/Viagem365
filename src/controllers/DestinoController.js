const Destino = require("../models/Destino")
const axios = require('axios')
const yup = require('yup')

const destinoSchema = yup.object().shape({
    usuario_id: yup.number().required('Usuário é obrigatório'),
    nome_local: yup.string().required('Nome do local é obrigatório').max(255),
    descricao: yup.string().required('Descrição é obrigatória').max(500),
    cep: yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'Formato de CEP inválido'),
    localidade: yup.string().required('Localidade é obrigatória').max(255),
    
});

class DestinoController {

    async cadastrar(req, res) {
        const { usuario_id, nome_local, descricao, cep, localidade } = req.body;

        try {
            // Validação dos dados de entrada usando Yup
            await destinoSchema.validate(req.body, { abortEarly: false });

            // Consulta o CEP na API Nominatim para obter as coordenadas
           // const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);
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
                    cep,
                    localidade,
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
            if (error.name === 'ValidationError') {
                res.status(400).json({ error: error.errors });
            } else {
                console.error('Erro ao consultar o CEP ou ao salvar no banco:', error);
                res.status(500).json({ error: 'Erro ao processar a solicitação' });
            }
        }
    }

    async listar(req, res) {
        try {
            const destinos = await Destino.findAll();
            res.json(destinos);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar os destinos' });
        }
    }

    async listarPorUsuario(req, res) {
        try {
            const { id } = req.params;
            const destinos = await Destino.findAll({
                where: { usuario_id: id }
            });
            if (destinos.length === 0) {
                return res.status(404).json({ error: 'Nenhum destino encontrado para este usuário.' });
            }
            res.json(destinos);
        } catch (error) {
            console.error('Erro ao listar destinos do usuário:', error);
            res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome_local, descricao, cep, localidade, latitude, longitude } = req.body;
            const destino = await Destino.findByPk(id);
            if (!destino) {
                return res.status(404).json({ message: 'Destino não encontrado!' });
            }
            await destino.update({
                nome_local,
                descricao,
                cep,
                localidade,
                latitude,
                longitude
            });
            res.json({ message: 'Destino atualizado com sucesso!', destino });
        } catch (error) {
            console.error('Erro ao atualizar destino:', error);
            res.status(500).json({ error: 'Não foi possível atualizar o destino' });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const destino = await Destino.findByPk(id);
            if (!destino) {
                return res.status(404).json({ message: 'Destino não encontrado!' });
            }
            await destino.destroy();
            res.json({ message: 'Destino deletado com sucesso!' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível deletar o destino' });
        }
    }
}

module.exports = new DestinoController();
