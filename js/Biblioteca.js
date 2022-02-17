class Biblioteca {
    constructor() {
        this.nombre = '';
        this.inventario = []; //de publicaciones
    }

    addPublicacion(publicacion){
        this.inventario.push(publicacion);
    }

    getImagen(n){
        if (n<this.inventario.length)
            return this.inventario[n]['imagen'];
        else
            return 'Error';
    }

}