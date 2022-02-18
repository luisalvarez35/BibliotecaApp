describe("Publicacion", function() {
  var publicacion;
  var ejemplar;
  
  beforeEach(function() {
    publicacion = new Publicacion('a','1','titulo','novela');
    ejemplar = new Ejemplar('Pasillo1','Disponible');
    
  });

  it('Crea en ejemplar',() => {
    publicacion.addEjemplar(ejemplar);
    expect(publicacion.ejemplares).toContain(ejemplar);
  })  



})