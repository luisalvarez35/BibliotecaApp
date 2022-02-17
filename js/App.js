class App {

    constructor() {
        this.biblioteca = new Biblioteca();
    }


    datosForm() {

        var titulo, isbn, genero, imagen;

        titulo = document.getElementById("titulo").value;
        isbn = document.getElementById("isbn").value;
        genero = document.getElementById("genero").value;
        imagen = document.getElementById("imagen").value;

        var publicacion = new Publicacion(imagen, isbn, titulo, genero);

        this.biblioteca.addPublicacion(publicacion);



        console.log("Datos Nuevos..");
        console.log(this.biblioteca);
    }

    fakeData()// Inicializar Biblioteca con datos falsos usando faker
    {

        var nombre = faker.name.findName();
        this.biblioteca.nombre = nombre;

        var numeroInventario = faker.datatype.number({
            'min': 5,
            'max': 10
        });

        for (let i = 0; i < numeroInventario; i++) {
            var imagen = faker.image.abstract();
            var isbn = faker.datatype.number({'min': 5, 'max': 10});
            var titulo = faker.random.word();
            var genero = faker.random.word();
            var publicacion = new Publicacion(imagen, isbn, titulo, genero);

            var nejemplares = faker.datatype.number({'min': 5, 'max': 10});

            for (let j = 0; j < nejemplares; j++) {
                var ubicacion = faker.datatype.number({'min': 5, 'max': 10});
                var estado = faker.datatype.number({'min': 5, 'max': 10});

                var ejemplar = new Ejemplar(ubicacion, estado);
                publicacion.addEjemplar(ejemplar);
            }

            this.biblioteca.addPublicacion(publicacion);
        }

    }

    InicioBiblio()// Inicializar biblioteca con datos de array
    {
        var BiblioArray = {
            "Biblioteca": {
                "nombre": "Biblioteca",
                "inventario": [{
                    "imagen": "./img/slides-1.jpg",
                    "isbn": "123456",
                    "titulo": "Coches",
                    "genero": "Educacion",
                    "ejemplares": [{
                        "ubicacion": "",
                        "estado": "prestado"
                    },
                        {
                            "ubicacion": "",
                            "estado": "extraviado"
                        },
                        {
                            "ubicacion": "pasillo1",
                            "estado": "disponible"
                        }]
                },
                    {
                        "imagen": "./img/slides-2.jpg",
                        "isbn": "1543456",
                        "titulo": "Cocina",
                        "genero": "Novela",
                        "ejemplares": [
                            {
                                "ubicacion": "pasillo4",
                                "estado": "desscatalogado"
                            },
                            {
                                "ubicacion": "pasillo9",
                                "estado": "disponible"
                            },
                            {
                                "ubicacion": "pasillo6",
                                "estado": "prestado"
                            }]
                    },
                    {
                        "imagen": "./img/slides-3.jpg",
                        "isbn": "4553456",
                        "titulo": "Informatica",
                        "genero": "Tecnico",
                        "ejemplares": [{
                            "ubicacion": "pasillo6",
                            "estado": "desscatalogado"
                        },
                            {
                                "ubicacion": "pasillo2",
                                "estado": "extraviado"
                            },
                            {
                                "ubicacion": "pasillo8",
                                "estado": "disponible"
                            }]
                    }
                ]
            }
        }

        //console.log(BiblioArray);
        //console.log(BiblioArray["Biblioteca"]['nombre']);

        this.biblioteca.nombre = BiblioArray["Biblioteca"]['nombre'];

        var ninventario = BiblioArray["Biblioteca"]['inventario'].length;

        for (let i = 0; i < ninventario; i++) {
            var imagen = BiblioArray["Biblioteca"]['inventario'][i]['imagen'];
            var isbn = BiblioArray["Biblioteca"]['inventario'][i]['isbn'];
            var titulo = BiblioArray["Biblioteca"]['inventario'][i]['titulo'];
            var genero = BiblioArray["Biblioteca"]['inventario'][i]['genero'];
            var publicacion = new Publicacion(imagen, isbn, titulo, genero);

            var nejemplares = BiblioArray["Biblioteca"]['inventario'][i]['ejemplares'].length;

            for (let j = 0; j < nejemplares; j++) {

                var ubicacion = BiblioArray["Biblioteca"]['inventario'][i]['ejemplares'][j]['ubicacion'];
                var estado = BiblioArray["Biblioteca"]['inventario'][i]['ejemplares'][j]['estado'];

                var ejemplar = new Ejemplar(ubicacion, estado);
                publicacion.addEjemplar(ejemplar);
            }

            this.biblioteca.addPublicacion(publicacion);
        }
    }

    renderCarousel(inventario) {

        var summaryCarousel = document.querySelector("#summaryCarousel")
        for (let i = 0; i < inventario.length; i++) {
            const element = inventario[i];

            var templateCarousel = document.querySelector("#carouselTemplate");
            var cloneTemplateCarousel = document.importNode(templateCarousel.content, true);

            var Rutaimagen = cloneTemplateCarousel.querySelector("#img");
            Rutaimagen.src = element.imagen;


            summaryCarousel.appendChild(cloneTemplateCarousel);
        }

    }

    dataforDatatableArray()//No se usa, primera version
    {
        var data = [];

        var BiblioArray = {
            "Biblioteca": {
                "nombre": "Biblioteca",
                "inventario": [{
                    "imagen": "./img/slides-1.jpg",
                    "isbn": "123456",
                    "titulo": "Coches",
                    "genero": "Educacion",
                    "ejemplares": [{
                        "ubicacion": "",
                        "estado": "prestado"
                    },
                        {
                            "ubicacion": "",
                            "estado": "extraviado"
                        },
                        {
                            "ubicacion": "pasillo1",
                            "estado": "disponible"
                        }]
                },
                    {
                        "imagen": "./img/slides-2.jpg",
                        "isbn": "1543456",
                        "titulo": "Cocina",
                        "genero": "Novela",
                        "ejemplares": [
                            {
                                "ubicacion": "pasillo4",
                                "estado": "desscatalogado"
                            },
                            {
                                "ubicacion": "pasillo9",
                                "estado": "disponible"
                            },
                            {
                                "ubicacion": "pasillo6",
                                "estado": "prestado"
                            }]
                    },
                    {
                        "imagen": "./img/slides-3.jpg",
                        "isbn": "4553456",
                        "titulo": "Informatica",
                        "genero": "Tecnico",
                        "ejemplares": [{
                            "ubicacion": "pasillo6",
                            "estado": "desscatalogado"
                        },
                            {
                                "ubicacion": "pasillo2",
                                "estado": "extraviado"
                            },
                            {
                                "ubicacion": "pasillo8",
                                "estado": "disponible"
                            }]
                    }
                ]
            }
        }

        var ninventario = BiblioArray["Biblioteca"]['inventario'].length;

        for (let i = 0; i < ninventario; i++) {
            var isbn = BiblioArray["Biblioteca"]['inventario'][i]['isbn'];
            var titulo = BiblioArray["Biblioteca"]['inventario'][i]['titulo'];
            var genero = BiblioArray["Biblioteca"]['inventario'][i]['genero'];
            var nejemplares = BiblioArray["Biblioteca"]['inventario'][i]['ejemplares'].length;
            data.push([titulo, genero, isbn, nejemplares]);
        }
        return data;
    }

    dataforDatatable()//Saca los datos de la clase biblioteca y los convierte para pasarlos al datatable
    {
        var data = [];

        /*var Botones =
            <a href="#"  data-toggle="tooltip" title="Editar datos" class="btn btn-sm btn-info"> <i class="fas fa-edit"></i> Editar </a>

            <a href="#"  data-toggle="tooltip" title="Eliminar" class="btn btn-sm btn-danger"> <i class="fa fa-trash"></i> </a>
       ;*/

        var ninventario = this.biblioteca.inventario.length;

        for (let i = 0; i < ninventario; i++) {

            var isbn = this.biblioteca.inventario[i].isbn;
            var titulo = this.biblioteca.inventario[i].titulo;
            var genero = this.biblioteca.inventario[i].genero;
            var nejemplares = this.biblioteca.inventario[i].ejemplares.length;
            data.push([titulo, genero, isbn, nejemplares]);

        }

        return data;
    }

    renderDatatables()//llamo a metodo dentro para pasar las lineas
    {
        /**
         * Initiate Datatables
         */

        let myData = {
            "headings": [
                "Titulo",
                "Genero",
                "ISBN",
                "Ejemplares"
            ],
            "data": this.dataforDatatable()
        };
        console.log(myData)
        const datatables = document.querySelectorAll('.datatable')
        datatables.forEach(datatable => {
            new simpleDatatables.DataTable(datatable, {

                columns: [
                    // Sort the second column in ascending order
                    {select: 1, sort: "desc"},
                ],
                'paging': true,

                'data': myData,

            });
        })
    }
}

