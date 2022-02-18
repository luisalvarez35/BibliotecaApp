describe("App", function() {
  var app;
  var ejemplar;
  var publicacion
  
  beforeEach(function() {
    app = new App();

    publicacion = new Publicacion('a','1','titulo','novela');
    ejemplar = new Ejemplar('Pasillo1','Disponible');
    
  });

  it('Inicializar Biblioteca con datos falsos usando faker',() => {
   app.fakeData();
    expect(app.biblioteca.inventario).toContain(Publicacion);
  })





})