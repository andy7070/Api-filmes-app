const express = require('express');

const fs = require('fs')

const app = express();

const port = 3000;

const axios = require('axios');

const cors = require('cors');
const { error } = require('console');



app.use(express.json())

app.use(cors())



app.get('/filmesAdicionadosRecentemente', async (req, res) => {

    try{

     const response = await axios.get('https://www.play-tv-stream.online/projeto-filmes-db999-default-rtdb-FilmesAdicionadosRecentemente-export.json');


     res.json(response.data)


    }catch(erro){

        console.error('Erro ao receber dados', erro);

        res.status(500).send('Erro ao buscar dados');
    }



})


app.get('/filmesAcao', async (req, res) => {

    try{

        const response = await axios.get('https://www.play-tv-stream.online/projeto-filmes-db999-default-rtdb-FilmesAção-export.json')

        
        res.json(response.data)

    }catch(erro){
        console.error('Erro ao receber dados', erro)
         
        res.status(500).send('Erro ao busca dados');

    }

})


app.get('/filmesComedia', async (req, res) => {

    try{

    const response = await axios.get('https://www.play-tv-stream.online/projeto-filmes-db999-default-rtdb-FilmesComedia-export.json')

    res.json(response.data)

    }catch(erro){
        console.error('Erro ao receber dados', erro)
        res.status(500).send('Erro ao buscar dados')
    }

})

app.get('/filmesRomance', async (req, res) => {
            
    try{

        const response = await axios.get('https://www.play-tv-stream.online/projeto-filmes-db999-default-rtdb-FilmesRomance-export.json')

        res.json(response.data)

    }catch(erro){
        console.error('Erro ao buscar dados', erro)

        res.status(500).send('Erro ao buscar dados')
    }
})


app.get('/filmesTerror', async (req, res) => {


    try{

        const response = await axios.get('https://www.play-tv-stream.online/projeto-filmes-db999-default-rtdb-FilmesTerror-export.json')

        res.json(response.data)

    }catch(erro){
        console.error('Erro ao buscar dados do servidor')

        res.status(500).send('Erro ao buscar dados')
    }

})

app.get('/filmesFiccao', async (req, res) => {

    try{

        const response = await axios.get('https://www.play-tv-stream.online/projeto-filmes-db999-default-rtdb-FilmesSFI-export.json')

        res.json(response.data)
    
    }catch(erro){
        console.error('Erro ao buscar dados', erro)

        res.status(500).send('Erro ao buscar dados')
    }

})

app.get('/filmesAventura', async (req, res) => {

    try{

        const response = await axios.get('https://www.play-tv-stream.online/projeto-filmes-db999-default-rtdb-FilmesAventura-export.json')

        res.json(response.data)
    
    }catch(erro){
        console.error('Erro ao buscar dados', erro)

        res.status(500).send('Erro ao buscar dados')
    }

})





app.post('/likes', (req, res) => {

    const novoFilme =req.body;

    fs.readFile('data.json', 'utf8', (err, data) => {

        if(err){
            return res.status(500).json({error: 'Erro ao ler o arquivo'})
        }

        const filmes = JSON.parse(data)


        filmes.push(novoFilme)


        fs.writeFile('data.json', JSON.stringify(filmes, null, 2), (err) => {

            if(err){
                return res.status(500).json({error: 'Erro ao salvar o arquivo'})
            }

            res.json({message: 'Filme adicionado com sucesso'})

        })
    })

})



app.get('/likesRecuperacao', (req, res) => {


    fs.readFile('data.json', 'utf8', (err, data) => {

        if(err){
            return res.status(500).json({error: 'Erro ao ler arquivo'})
        }

        const filmes = JSON.parse(data)

        res.json(filmes)
    })
})



app.listen(port, () => {

    console.log(`Servidor rodando na porta ${port}`)

})





