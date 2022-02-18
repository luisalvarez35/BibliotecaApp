describe("Biblioteca", function() {
  var biblioteca;
  var publicacion;
  
  beforeEach(function() {
    biblioteca = new Biblioteca();
    publicacion = new Publicacion('a','1','titulo','novela');

  });

  it('Añade una publicacion',() => {
    biblioteca.addPublicacion(publicacion);
    expect(biblioteca.inventario).toContain(publicacion);
  })  



})