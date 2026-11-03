
var productos = [
  {
    id: 1, nombre: "La Kase Doble", categoria: "hamburguesas", precio: 24900,
    descripcion: "Doble carne a la plancha, queso cheddar, cebolla caramelizada y salsa de la casa.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQqmlTQSKqskjLoQjdSWaiR_7o8QmhI4vAoaTyyiNRCCFPX2GwCxslFc7r&s=10"
  },
  {
    id: 2, nombre: "Brasa Picante", categoria: "hamburguesas", precio: 22500,
    descripcion: "Carne ahumada, jalapeños, tocineta crocante y mayonesa de ají.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt5gtYPoAltkHDZPros3RzsariYHSwxLbvD-IGxQoizBT_iEf-DpbCeTtZ&s=10"
  },
  {
    id: 3, nombre: "Pollo Crujiente", categoria: "hamburguesas", precio: 20900,
    descripcion: "Pechuga apanada, lechuga, pepinillos y miel mostaza.",
    imagen: "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/681c719667d572276a1507aea71de9ca.jpg"
  },
  {
    id: 4, nombre: "Perro Dorado", categoria: "perros", precio: 17900,
    descripcion: "Salchicha ahumada, queso fundido, papa ripio y salsa de la casa.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTki-ggnLlCdIK4oRmqNegH44UpZ4HAKOSSlDdhGCDSyvQI-O3CA4Ytx1qr&s=10"
  },
  {
    id: 5, nombre: "Perro Callejero", categoria: "perros", precio: 16500,
    descripcion: "Salchicha, huevo de codorniz, piña, salsas y mucho queso rallado.",
    imagen: "https://fazan.com.co/wp-content/uploads/2026/06/perro-caliente-colombiano.jpg"
  },
  {
    id: 6, nombre: "Papas Kase", categoria: "acompañantes", precio: 9900,
    descripcion: "Papas en bastón con sal de ajo y dip de queso.",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/941f50-splendid-table-french-fries.jpg/1280px-941f50-splendid-table-french-fries.jpg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
  },
  {
    id: 7, nombre: "Aros de Cebolla", categoria: "acompañantes", precio: 8900,
    descripcion: "Apanados en cerveza, servidos con salsa barbacoa.",
    imagen: "https://www.elespectador.com/wp-content/uploads/elespectador/DT6XASKCERB5NFKRKTL7ASM3MM.jpg"
  },
  {
    id: 8, nombre: "Limonada de Mango", categoria: "bebidas", precio: 7500,
    descripcion: "Limonada natural batida con mango biche. 16 oz.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyO5YomVVb4HR6nJQS91gwZVa-PBxkipwO2beVXz3rZB3Is8h3Npdh6JxC&s=10"
  },
  {
    id: 9, nombre: "Malteada de Arequipe", categoria: "bebidas", precio: 12900,
    descripcion: "Helado de vainilla, arequipe y galleta triturada.",
    imagen: "https://www.goodnes.com/sites/g/files/jgfbjl321/files/srh_recipes/c02cf0a5de1a33dd94f10bdb0bc86b5b.jpg"
  }
];

var contenedorProductos = document.getElementById("listaProductos");
var listaPanel = document.getElementById("listaPanelTicket");
var totalPanel = document.getElementById("totalPanelTicket");
var avisoAgregado = document.getElementById("avisoAgregado");
var temporizadorAviso;

/* ---------- Menú ---------- */

/* Si el producto tiene enlace de imagen, la muestra; si no, muestra un bloque con la inicial */
function crearImagen(producto) {
  if (producto.imagen !== "") {
    return '<img class="tarjeta-producto__foto" src="' + producto.imagen + '" alt="' + producto.nombre + '">';
  }
  return '<div class="tarjeta-producto__imagen" data-categoria="' + producto.categoria + '"><span>' +
    producto.nombre.charAt(0) + '</span></div>';
}

function mostrarProductos(categoria) {
  var html = "";
  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
    if (categoria === "todos" || producto.categoria === categoria) {
      html = html +
        '<div class="col-12 col-sm-6 col-lg-4">' +
        '<article class="tarjeta-producto">' +
        crearImagen(producto) +
        '<div class="tarjeta-producto__cuerpo">' +
        '<h3 class="tarjeta-producto__nombre">' + producto.nombre + '</h3>' +
        '<p class="tarjeta-producto__descripcion">' + producto.descripcion + '</p>' +
        '<div class="tarjeta-producto__pie">' +
        '<strong class="tarjeta-producto__precio">' + formatearPrecio(producto.precio) + '</strong>' +
        '<button class="boton-kase boton-kase--pequeno" type="button" onclick="agregarAlTicket(' + producto.id + ')">Pedir</button>' +
        '</div>' +
        '</div>' +
        '</article>' +
        '</div>';
    }
  }
  contenedorProductos.innerHTML = html;
}

/* Cambia el botón de filtro activo y vuelve a mostrar el menú */
function filtrarMenu(boton, categoria) {
  var botones = document.querySelectorAll(".boton-filtro");
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("activo");
  }
  boton.classList.add("activo");
  mostrarProductos(categoria);
}


function agregarAlTicket(idProducto) {
  var ticket = obtenerTicket();
  var productoElegido = null;
  var yaEstaba = false;

  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      productoElegido = productos[i];
    }
  }

  for (var j = 0; j < ticket.length; j++) {
    if (ticket[j].id === idProducto) {
      ticket[j].cantidad = ticket[j].cantidad + 1;
      yaEstaba = true;
    }
  }

  if (yaEstaba === false) {
    ticket.push({
      id: productoElegido.id,
      nombre: productoElegido.nombre,
      precio: productoElegido.precio,
      cantidad: 1
    });
  }

  guardarTicket(ticket);
  mostrarPanelTicket();
  mostrarAviso(productoElegido.nombre);
}

function mostrarPanelTicket() {
  var ticket = obtenerTicket();
  var html = "";

  if (ticket.length === 0) {
    listaPanel.innerHTML = '<p class="ticket-vacio">Tu ticket está vacío. Elige algo del menú y arrancamos.</p>';
    totalPanel.textContent = formatearPrecio(0);
    return;
  }

  for (var i = 0; i < ticket.length; i++) {
    var linea = ticket[i];
    html = html +
      '<div class="linea-ticket">' +
      '<div>' +
      '<span class="linea-ticket__nombre">' + linea.nombre + '</span>' +
      '<small>' + formatearPrecio(linea.precio) + ' c/u</small>' +
      '</div>' +
      '<div class="linea-ticket__acciones">' +
      '<button type="button" class="boton-cantidad" onclick="restarProducto(' + linea.id + ')" aria-label="Quitar una unidad">−</button>' +
      '<span>' + linea.cantidad + '</span>' +
      '<button type="button" class="boton-cantidad" onclick="sumarProducto(' + linea.id + ')" aria-label="Agregar una unidad">+</button>' +
      '<button type="button" class="boton-cantidad boton-cantidad--borrar" onclick="eliminarProducto(' + linea.id + ')" aria-label="Eliminar producto">×</button>' +
      '</div>' +
      '</div>';
  }
  listaPanel.innerHTML = html;
  totalPanel.textContent = formatearPrecio(calcularTotal(ticket));
}

function sumarProducto(idProducto) {
  cambiarCantidad(idProducto, 1);
  mostrarPanelTicket();
}

function restarProducto(idProducto) {
  cambiarCantidad(idProducto, -1);
  mostrarPanelTicket();
}

function eliminarProducto(idProducto) {
  quitarDelTicket(idProducto);
  mostrarPanelTicket();
}

/* Mensaje que sube desde abajo al agregar un producto */
function mostrarAviso(nombreProducto) {
  avisoAgregado.textContent = nombreProducto + " agregado al ticket";
  avisoAgregado.classList.add("aviso-agregado--visible");
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(function () {
    avisoAgregado.classList.remove("aviso-agregado--visible");
  }, 1800);
}

mostrarProductos("todos");
mostrarPanelTicket();
