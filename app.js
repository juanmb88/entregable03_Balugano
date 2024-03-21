import express from "express";
import {ManagerUsuarios} from './src/productManager.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
const puerto = 3000;
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Escucha del servidor
app.listen(puerto, () => console.log('Servidor andando en puesto ', puerto));

const managerUsuarios = new ManagerUsuarios();
const productosLeidos = managerUsuarios.getProducts();

// /////////////ENDPOINT PARA VER PRODUCTOS TOTAL///////////////
app.get('/', async (req, res) => {

    const productParseados = await productosLeidos;
    if(productParseados){
        res.send(productParseados);
    }else{
        res.status(500).send('Error interno del servidor');
    }
});

// /////////////ENDPOINT PARA VER PRODUCTOS CON LIMITE///////////
app.get('/products', async (req, res) => {
        //let skipping =parseInt( req.query.skip);//se agrega skipp quie establece desde donde
        let limit = parseInt(req.query.limit);//se marca un limite
        const productParseados = await productosLeidos;
        const globalLimit = productParseados.slice(0,limit);
        if(globalLimit){
            res.send(globalLimit);
        }else{
            res.status(500).send('Error interno del servidor');
        }
});

// /////////////ENDPOINT PARA VER PRODUCTOS POR ID//////////////
app.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    const productParseados = await productosLeidos;
    const productById = productParseados.find(product => product.id === id);

    if (productById) {
        res.json(productById);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});
