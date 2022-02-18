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
            app.renderGrafico();
            app.renderCarousel(app.biblioteca.inventario)
            console.log(app.biblioteca);
            console.log("Datos Cargados....");
            console.log(app.biblioteca);
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////

    CargaJsonBiblio();
});
