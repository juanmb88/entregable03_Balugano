import express from "express";
//import path from 'path';
import {ManagerUsuarios} from './src/productManager.js'
const app = express();
const puerto = 3000;

//import { fileURLToPath } from 'url';
//import { dirname } from 'path';
//const __filename = fileURLToPath(import.meta.url);
//export const __dirname = dirname(__filename);

//middlewares 
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//PRIMER RESPONSE
/*  app.get('/',((req, res)=>   

res.sendFile(ManagerUsuarios.resolve(__dirname))

) ) */
app.get('/', async (req, res) => {
    const archivoProduct = ManagerUsuarios.resolvePath(__dirname, 'src/info.json');
    res.sendFile(archivoProduct);
});

 /////////////ENDPOINST PARA AGREGAR PRODUCTO///////////

 app.post('/products', async (req, res) => {
    try {
        const nuevoProducto = req.body; // Se espera que el cuerpo de la solicitud contenga el nuevo producto
        const productoAgregado = await manager.addProducts(nuevoProducto);
        res.json({ productoAgregado });
    } catch (error) {
        console.log(`Error al agregar producto: ${error.message}`);
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});


 /////////////ENDPOINST PARA AGREGAR PRODUCTO POR ID///////////

 app.get('/usuario/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = personas.find(user => user.id === userId);

    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

app.listen(puerto, ()=> console.log('Servidor andando en puesto ', puerto))

