
        let app;

        function Borrar( isbn ) {
            alert('Se ha borrado la publicacion con ISBN: '+isbn);
            app.BorrarPublicacion( isbn );
            app.renderDatatables();

            console.log("Inventario actualizado....")
            console.log(app.biblioteca.inventario)

        }
        function detalles(data){
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
            app.CargaBiblio(Biblioteca);//Para utilizar datos del archivo json
            //app.fakeData()//Para utilizar datos creados con faker
            app.renderDatatables();
            console.log("Datos Cargados....");
            console.log(app.biblioteca);

        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////


    CargaJsonBiblio();

    document.getElementById ("enviar").addEventListener ("click",() => {
        app.PublicacionForm();})

    document.getElementById ("enviarEjemplar").addEventListener ("click",() => {
        app.EjemplarForm();})

    document.getElementById ("GenJSON").addEventListener ("click",() => {
        app.ListaBiblioJson();})


});
