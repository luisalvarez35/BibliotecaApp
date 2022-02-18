class App {

    constructor() {
        this.biblioteca = new Biblioteca();
    }


    ListaBiblioJson()// Genera Json de la Biblioteca
    {
        var ListaInventario = [];                                  // Lista de Inventario
        var ninventario     = this.biblioteca.inventario.length;

        for (let i = 0; i < ninventario; i++)
        {

            var ListaEjemplares = [];                              // Array con los ejemplares
            var nejemplares = this.biblioteca.inventario[i].ejemplares.length;
            for (let j = 0; j < nejemplares; j++)
            {
                ListaEjemplares.push( {
                    "ubicacion":this.biblioteca.inventario[i].ejemplares[j].ubicacion,
                    "estado":this.biblioteca.inventario[i].ejemplares[j].estado
                });
            }

            ListaInventario.push( {
                "imagen":this.biblioteca.inventario[i].imagen,
                "isbn":this.biblioteca.inventario[i].isbn,
                "titulo":this.biblioteca.inventario[i].titulo,
                "genero":this.biblioteca.inventario[i].genero,
                "ejemplares": ListaEjemplares
            });
        }

        var DatosBiblio = {};
        DatosBiblio.nombre     = this.biblioteca.nombre;
        DatosBiblio.inventario = ListaInventario;// Añadimos la Inventario a la Biblioteca
        var DatosJSON = {};
        DatosJSON.Biblioteca = DatosBiblio;

        console.log('___Datos Biblioteca en JSON___');
        console.log(JSON.stringify(DatosJSON));
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

    CargaBiblio(jsonObj)// Recibe Objeto Json y carga los datos en la biblioteca
    {
        console.log("____Biblioteca cargada: "+ jsonObj["Biblioteca"]['nombre']+"____");
        this.biblioteca.nombre = jsonObj["Biblioteca"]['nombre'];


        var ninventario = jsonObj["Biblioteca"]['inventario'].length;

        for (let i=0; i < ninventario ;i++){
            var imagen = jsonObj["Biblioteca"]['inventario'][i]['imagen'];
            var isbn = jsonObj["Biblioteca"]['inventario'][i]['isbn'];
            var titulo = jsonObj["Biblioteca"]['inventario'][i]['titulo'];
            var genero = jsonObj["Biblioteca"]['inventario'][i]['genero'];

            var publicacion = new Publicacion(imagen,isbn,titulo,genero);

            var nejemplares = jsonObj["Biblioteca"]['inventario'][i]['ejemplares'].length;

            for (let j=0; j<nejemplares ;j++){

                var ubicacion = jsonObj["Biblioteca"]['inventario'][i]['ejemplares'][j]['ubicacion'];
                var estado = jsonObj["Biblioteca"]['inventario'][i]['ejemplares'][j]['estado'];

                var ejemplar = new Ejemplar(ubicacion,estado);
                publicacion.addEjemplar(ejemplar);
            }
            this.biblioteca.addPublicacion(publicacion);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////

    setCookie(cname, cvalue, exdays)//crear cookies
    {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname)//recuperar cookies
    {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    detallesPublicacion(data)//Cargamos datos tabla en cookies y redirigimos a pagina de descripcion
    {
        let arr = data.split(',');
        var titulo = arr[0];
        var genero = arr[1];
        var isbn = arr[2];
        var ejemplares = arr[3];

        this.setCookie("titulo",titulo,10);
        this.setCookie("genero",genero,10);
        this.setCookie("isbn",isbn,10);
        this.setCookie("ejemplares",ejemplares,10);

        window.location.href="detalles.html";

    }

    PublicacionForm()//Guarda publicacion
    {
        var titulo, isbn, genero, imagen;

        titulo = document.getElementById("titulo").value;
        isbn = document.getElementById("isbn").value;
        genero = document.getElementById("genero").value;
        imagen = document.getElementById("imagen").value;

        if(titulo!=='' && isbn!=='' && genero!=='' && imagen!==''){
            var publicacion = new Publicacion(imagen, isbn, titulo, genero);
            this.biblioteca.addPublicacion(publicacion);
            console.log("Datos Nuevos....");
            console.log(this.biblioteca);
        }else{
            alert("Datos no validos");
        }
    }

    EjemplarForm()//Guarda ejemplar
    {
        var ubicacion,estado,publicacion;

        ubicacion = document.getElementById("ubicacion").value;
        estado = document.getElementById("estado").value;
        publicacion = document.getElementById("publicacion").value;

        /*var x = document.getElementById("publicacion").selectedIndex;

        publicacion = document.getElementsByTagName("option")[x].value;*/

        var ejemplar = new Ejemplar(ubicacion,estado);

        var ninventario = this.biblioteca.inventario.length;

        var noExiste =0;

        for (let i = 0; i < ninventario; i++) {

            var titulo = this.biblioteca.inventario[i]['titulo'];

            if (titulo === publicacion) {
                noExiste=0;
                this.biblioteca.inventario[i].addEjemplar(ejemplar);
                console.log("Nuevo ejemplar introducido..")
                console.log("Datos Nuevos..");
                console.log(this.biblioteca.inventario);
                break;
            }else{
                noExiste=1;
            }
        }
        if(noExiste==1)alert('La Publicacion no existe o los datos son incorrectos..')
    }

    renderCarousel(inventario)
    {

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

    dataforDatatable()//Saca los datos de la clase biblioteca y los convierte para pasarlos al datatable
    {
        var data = [];

        var ninventario = this.biblioteca.inventario.length;
        var opciones = '';//varieble en blanco para opciones

        for (let i = 0; i < ninventario; i++) {

            var isbn = this.biblioteca.inventario[i].isbn;
            var titulo = this.biblioteca.inventario[i].titulo;
            var genero = this.biblioteca.inventario[i].genero;
            var nejemplares = this.biblioteca.inventario[i].ejemplares.length;
            data.push([titulo, genero, isbn, nejemplares, opciones]);

        }

        return data;
    }

    renderDatatables()//llamo a metodo dentro para pasar las lineas
    {
        let myData = {
            "headings": [
                "Titulo",
                "Genero",
                "ISBN",
                "Ejemplares",
                "Opciones"
            ],
            "data": this.dataforDatatable()
        };
        //console.log(myData)
        const datatables = document.querySelectorAll('.datatable')
        datatables.forEach(datatable => {
            new simpleDatatables.DataTable(datatable, {

                columns: [
                    // Sort the second column in ascending order
                    {select: 1, sort: "desc"},
                    {
                        select: 4,
                        render: function(data, cell, row) {
                            return data + '<a class="btn btn-danger" href="#" title="Borrar" onclick="Borrar('+"'"+myData.data[row.dataIndex][2]+"'"+')">Borrar</a>'+'  '+
                                '<a class="btn btn-info" href="#" title="Detalles" onclick="detalles('+"'"+myData.data[row.dataIndex]+"'"+')">Detalles</a>'
                        }
                    }
                ],
                'paging': true,

                'data': myData,
           });
        })


    }

    dataGrafico()//Genera datos para grafico de la biblioteca
    {

        var grafico = [];

        var ninventario = this.biblioteca.inventario.length;
        for (let i = 0; i < ninventario; i++) {

            var genero = this.biblioteca.inventario[i].genero;
            var nejemplares = this.biblioteca.inventario[i].ejemplares.length;
            grafico.push({
                'value': nejemplares,
                'name': genero
            });
        }

        return grafico;

    }

    renderGrafico()//Renderiza grafico
    {

        echarts.init(document.querySelector("#pieChart")).setOption({
            title: {
                text: 'Numero de Ejemplares',
                subtext: 'Por Genero',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [{
                name: 'Genero',
                type: 'pie',
                radius: '50%',
                data: this.dataGrafico()
                ,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        });
    }

    BorrarPublicacion(isbnborrar)//Borra publicacion por isbn en datatable
    {
        var ninventario = this.biblioteca.inventario.length;
        for (let i = 0; i < ninventario; i++)
        {
            var isbn = this.biblioteca.inventario[i].isbn;
            if ( isbnborrar == isbn ){
                this.biblioteca.inventario.splice(i,1);
                break;
            }
        }
    }

    /*renderOption(inventario)
    {

        var summaryOption = document.querySelector("#publicacion")
        for (let i = 0; i < inventario.length; i++) {
            const element = inventario[i];

            var templateCarousel = document.querySelector("#select");
            var cloneTemplateCarousel = document.importNode(templateCarousel.content, true);

            var Titulos = cloneTemplateCarousel.querySelector("#option");
            Titulos.value = element.titulo;
            Titulos.innerHTML = element.titulo;
            //Titulos.id = element.titulo;


            summaryOption.appendChild(cloneTemplateCarousel);
        }

    }*/

}

