import express from "express";
//import path from 'path';
import {ManagerUsuarios} from './src/productManager.js'
const app = express();
const puerto = 3000;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

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

 
app.listen(puerto, ()=> console.log('Servidor andando en puesto ', puerto))

/* El problema parece estar relacionado con las rutas y cómo se están manejando en tu proyecto. En tu archivo app.js, estás intentando acceder a la función resolve en ManagerUsuarios, pero esa función no está definida en tu clase ManagerUsuarios. Además, al utilizar sendFile, es más adecuado proporcionar la ruta completa del archivo que deseas enviar.
Manejo de Rutas:

Asegúrate de que las rutas estén bien especificadas. Al usar resolve en ManagerUsuarios, necesitas asegurarte de que el método resolve esté disponible. Puedes modificar tu clase ManagerUsuarios para tener un método estático que resuelva las rutas. Por ejemplo:


import path from 'path';

export class ManagerUsuarios {
    // ... tus otras funciones ...

    static resolvePath(basePath, relativePath) {
        return path.resolve(basePath, relativePath);
    }
}
Luego, en tu archivo app.js, puedes usar esto de la siguiente manera:

javascript
Copy code
app.get('/', async (req, res) => {
    const filePath = ManagerUsuarios.resolvePath(__dirname, 'src/info.json');
    res.sendFile(filePath);
});
Rutas Relativas en ManagerUsuarios:

En tu clase ManagerUsuarios, asegúrate de que las rutas se manejen de manera relativa a la ubicación del archivo. Modifica el constructor de ManagerUsuarios para que la PATH sea relativa al directorio en el que se encuentra el archivo ManagerUsuarios.

javascript
Copy code
constructor(title, description, price, thumbnail, code, stock) {
    this.PATH = path.resolve(__dirname, 'info.json');
    // ... tus otras propiedades ...
}
De esta manera, al crear una instancia de ManagerUsuarios en tu archivo, no necesitas pasar la ruta, ya que se ha definido internamente en la clase.

Manejo de Errores:

Asegúrate de manejar los errores de manera adecuada para obtener información más detallada sobre lo que está fallando. Puedes agregar información adicional a tus mensajes de error para ayudarte a diagnosticar los problemas.

Después de realizar estos cambios, deberías poder ejecutar tu aplicación correctamente desde la raíz del proyecto usando npm start. Si aún encuentras problemas, revisa las rutas y asegúrate de que todos los archivos y carpetas estén donde se espera que estén.

 */




// /mis modificaciones el en constructor

/* 
const __filename = fileURLToPath(import.meta.url);
this.PATH = path.resolve(dirname(__filename), 'info.json'); */