import path from 'path';
import fs  from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export class ManagerUsuarios {
    constructor(title, description, price, thumbnail, code, stock) {
        this.path = path.resolve(__dirname, 'info.json');
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock
        this.products = [];
    }  


//----------------------------------- OBTENER PRODUCTOS ----------------//
    getProducts = async () => {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const usuariosParseados = JSON.parse(data);
            return usuariosParseados;
        }catch(error){
            console.log(`Error al leer lista`);
        }
    };


//----------------------------------- AGREGAR PRODUCTOS ----------------//
    addProducts = async (product) => {
        try{
            const products = await this.getProducts();
            this.generarId(product, products);
            products.push(product);
            
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));//evito scroll horizontal en json
            return product;
        }catch(error){
            console.log(`Error, no se puede agregar producto ${error.message}`);
        }
    };   
    
    
//--------------------------------- ELIMINAR PRODUCTO POR ID------------//
    deleteProductById = async (productId) => {
        try {
            const products = await this.getProducts();        // Obtener la lista actual de productos
            const index = products.findIndex(product => product.id === productId);        // Encontrar el índice del producto con el ID dado
            
            if (index !== -1) {// Si se encuentra, eliminar el producto del array
                products.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));            // Guardar la lista actualizada en el archivo
                console.log(`Producto con ID ${productId} eliminado correctamente.`);
                
            } else {
                console.log(`No se encontró un producto con el ID ${productId}.`);
            }
        } catch (error) {
            console.log(`Error al eliminar el producto con ID ${productId}: ${error.message}`);
        }
    } ;
    
    //--------------------------------- OBTENER PRODUCTO POR ID----------------//
     getProductById = async (id) => {
        try {
            const products = await this.getProducts();//primero leo
            for (let i = 0; i < products.length; i++) {//dps recorro
                if (id === products[i].id) {
                    console.log("Producto encontrado mediante getProductById", products[i]);
                    return products[i];
                }
            }
            console.log("ERROR: No se encontró el producto");
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }; 
    
    
    //--------------------------------- ACTUALIZAR PRODUCTO POR ID----------------//
     updateProduct = async (productId, updatedFields) => {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === productId);
            
            if (index !== -1) {
                // Actualizar los campos especificados en updatedFields
                Object.assign(products[index], updatedFields);
                
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log(`Producto con ID ${productId} actualizado correctamente.`);
                return true;
            } else {
                console.log(`No se encontró un producto con el ID ${productId}.`);
                return false;
            }
        } catch (error) {
            console.log(`Error al actualizar el producto con ID ${productId}: ${error.message}`);
            return false;
        }
    }; 
    
    //----------------------------GENERAR ID AUTOINCREMENTAL----------------//
         generarId(product, products) {
            product.id =  (products.length === 0) ?  1 : products[products.length - 1].id + 1;
        };    
};


//INSTANCIAR
const products = new ManagerUsuarios('./info.json')

//OBTENER LISTA DE TODOS LOS PRODUCTOS////////////////////////////
const obtenerProductos = await products.getProducts();
console.log('Los Productos actuales son :', obtenerProductos);

//AGREGAR PRODUCTO////////////////////////////////////////////////
  const newProduct = await products.addProducts({
    title: "Juan",
    description: 'Peru',
    price: 700,
    thumbnail: 'Sin Imagen',
    code: "dh161",
    stock: 20
});
console.log("Producto agregado por metodo addProducts: " ,newProduct) 


//ELIMINAR PRODUCTO POR ID///////////////////////////////////////////////
await products.deleteProductById(7);


/////OBTENER PRODUCTO BY ID////////////////////////////////////////////////
await products.getProductById(4);


/////ACTUALIZAR PRODUCTO BY ID////////////////////////////////////////////////
  
/* await products.updateProduct(6, {
    description: 'Actualizadisiiimoooooo',
    price: 600,
    stock: 60
});  */

