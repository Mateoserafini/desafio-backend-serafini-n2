const fs = require("fs");
const fileProducts = "./fileProducts.json";
const productos = [
    {title: "Producto 1",description: "Descripción del producto 1",price: 520,img: "sin img",code: "COD1",stock: 45},
    {title: "Producto 2",description: "Descripción del producto 2",price: 718,img: "sin img",code: "COD2", stock: 62},
    {title: "Producto 3",description: "Descripción del producto 3",price: 279,img: "sin img",code: "COD3",stock: 83},
    {title: "Producto 4",description: "Descripción del producto 4",price: 635,img: "sin img",code: "COD4",stock: 17},
    {title: "Producto 5",description: "Descripción del producto 5",price: 194,img: "sin img",code: "COD5",stock: 96},
    {title: "Producto 6",description: "Descripción del producto 6",price: 847,img: "sin img",code: "COD6",stock: 3},
    {title: "Producto 7",description: "Descripción del producto 7",price: 382,img: "sin img",code: "COD7",stock: 72},
    {title: "Producto 8",description: "Descripción del producto 8",price: 130,img: "sin img",code: "COD8",stock: 29},
    {title: "Producto 9",description: "Descripción del producto 9",price: 879,img: "sin img",code: "COD9",stock: 81},
    {title: "Producto 10",description: "Descripción del producto 10",price: 54,img: "sin img",code: "COD10",stock: 49}
];

class ProductManager {

    static ultId = 0
    constructor() {
        this.products = [];
        this.path = fileProducts;
    }

    getProducts(){
        return this.products; 
    }

    addProduct(title, description, price, img, code, stock){

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }


        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico.");
            return; 
        }
        
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price, 
            img,
            code,
            stock
        }

        this.products.push(newProduct);
        this.guardarProductos();
    }

    getProductById(id){
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado.");
        } else {
            console.log("Producto encontrado.", product);
        }
    }

    guardarProductos() {
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), err => {
            if (err) {
                console.error('Error al guardar los productos:', err);
            }
        });
    }

    updateProduct(id, updatedFields) {
        const i = this.products.findIndex(product => product.id === id);
        if (i !== -1) {
            this.products[i] = { ...this.products[i], ...updatedFields };
            this.guardarProductos(); // Llama a la función para guardar los productos en el archivo.
        } else {
            console.log("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.guardarProductos(); // Llama a la función para guardar los productos en el archivo.
    }
}

/* 
//Testing: desafio 1
//1) Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager(); 

//2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(manager.getProducts());

//3) Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "123456", 25);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

//4)Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

manager.addProduct("vans clasic", "las mas lindas", 300, "sin imagen", "234567", 50);

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

manager.addProduct("vans bota", "las mas linas pero formato botita", 400, "sin imagen", "345678", 75);

console.log(manager.getProducts());

//5)Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo


manager.getProductById(1);
manager.getProductById(20);

*/

const manager = new ProductManager(); 

//TESTING
//Primer llamada = arreglo vacio
console.log(manager.getProducts());

// Agrego 10 productos y los muestro
for (const producto of productos) {
    manager.addProduct(producto.title, producto.description, producto.price, producto.img, producto.code, producto.stock);
}
console.log(manager.getProducts());

//Validacio de codigo repetido
manager.addProduct("Producto 1","Descripción del producto 1",520,"sin img","COD1",45);

//Validación de campos faltantes
manager.addProduct("Descripción del producto 1",520,"sin img","COD11",45);

//Buscamos productos por id
manager.getProductById(2);

//Producto no encontrado
manager.getProductById(11);

//Eliminamos algun producto y comprobamos si se elimino
manager.deleteProduct(2)
console.log(manager.getProducts());

//Eliminamos un producto que no existe
manager.deleteProduct(20)

// Editamos un producto (el 10) y comprobamos
manager.updateProduct(10, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 54,
    img: "con img",
    code: "COD10",
    stock: 50
});
console.log(manager.getProducts());

//Editamos un producto que no existe
manager.updateProduct(15, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 54,
    img: "con img",
    code: "COD10",
    stock: 50
});