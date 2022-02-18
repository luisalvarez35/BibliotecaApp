
        let app;

        function Borrar( isbn ) {
            alert('Borrar isbn: '+isbn);
            app.BorrarPublicacion( isbn );
            app.renderDatatables();
            console.log(app.biblioteca.inventario)

        }
        function detalles(data){
            console.log(data)
            app.detallesPublicacion(data);
        }


    document.addEventListener("DOMContentLoaded", function(event) {

    app = new App();

    ////////////////////////////////////////////////////////////////////////////////////////////
    // Recibe Objeto Json y carga los datos en la biblioteca
    ////////////////////////////////////////////////////////////////////////////////////////////
    function CargaJsonBiblio()
    {
        const requestURL = './biblioteca.json';
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            const Biblioteca = request.response;
            //app.CargaBiblio(Biblioteca);
            app.fakeData()
            //app.ListaBiblioJson();//Saca biblioteca en json por consola
            app.renderGrafico();
            app.renderDatatables();
            console.log(app.biblioteca);
            app.renderCarousel(app.biblioteca.inventario);
            //app.renderOption(app.biblioteca.inventario)
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////


    //app.fakeData()
    //app.InicioBiblio()
    CargaJsonBiblio();



    document.getElementById ("enviar").addEventListener ("click",() => {
        app.PublicacionForm();})

    document.getElementById ("enviarEjemplar").addEventListener ("click",() => {
        app.EjemplarForm();})

    document.getElementById ("GenJSON").addEventListener ("click",() => {
        app.ListaBiblioJson();})


});
