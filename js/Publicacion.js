class Publicacion{

    constructor(imagen,isbn,titulo,genero) {
        this.imagen = imagen;
        this.ejemplares = [];
        this.isbn = isbn;
        this.titulo = titulo;
        this.genero = genero;
    }

    addEjemplar(Ejemplar){
        this.ejemplares.push(Ejemplar);
    }

}