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

// /////////////ENDPOINT PARA VER PRODUCTOS///////////
app.get('/products', async (req, res) => {

        const limit = req.query.limit;
        const productos = await managerUsuarios.getProducts(limit);
        res.send(productos);
        res.status(500).send('Error interno del servidor');
    
});



/* app.get('/usaurio/:userId', ((req, res) => {
    let user = req.params.id
        users.find((user)=> user.id === userId)
    
    let data = personas.find(user) => (user.id === userId)
    console.log(user.id)  
    res.sendFile(user)
})) */
app.get('/products/:id', async (req, res) => {
    const productos = req.params.id; // Convertir el ID a número
    const data = await managerUsuarios.getProductById((hg) => hg.id == productos);
    if (data) {
        res.json(data);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});