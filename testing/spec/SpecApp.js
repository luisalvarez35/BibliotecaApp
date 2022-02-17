describe("App", function() {
  var app;
  
  beforeEach(function() {
    app = new App();
    
  });

  /*
  it('it create players',() => {
    let numPlayers = 5;
    app.crearJugadores(numPlayers);
    expect(app.jugadores.length).toBe(numPlayers)
  })  
  */

  it('crea una tienda',() => {
    
    app.addTienda('tienda 1');
    expect(app.tiendas.length).toBe(1)
  })  

  it('crea un gasto',() => {
    
    var nombreTienda = 'tienda 1';
    app.addTienda(nombreTienda);
    var tienda = app.getTienda(nombreTienda)

    var gasto = new Gasto('21/01/2022',90.4,'compra');
    tienda.addGasto(gasto);
    expect(app.tiendas.length).toBe(1)
    expect(tienda.gastos.length).toBe(1)
  }) 
  
  

  it('crea varios gastos por tiendas',() => {
    
    var nombreTienda = 'tienda 1';
    app.addTienda(nombreTienda);
    var tienda = app.getTienda(nombreTienda)

    var gasto = new Gasto('21/01/2022',90.4,'compra');
    tienda.addGasto(gasto);

    gasto = new Gasto('14/02/2022',40.4,'venta');
    tienda.addGasto(gasto);

    gasto = new Gasto('17/12/2021',64,'gasto');
    tienda.addGasto(gasto);



    nombreTienda = 'tienda 2';
    app.addTienda(nombreTienda);
    tienda = app.getTienda(nombreTienda)

    gasto = new Gasto('13/01/2022',77.1,'compra');
    tienda.addGasto(gasto);

    gasto = new Gasto('31/12/2021',11,'gasto');
    tienda.addGasto(gasto);

    expect(app.tiendas.length).toBe(2)
    expect(tienda.gastos.length).toBe(2)

    nombreTienda = 'tienda 1';
    app.addTienda(nombreTienda);
    tienda = app.getTienda(nombreTienda)
    expect(tienda.gastos.length).toBe(3)
  })

 


})