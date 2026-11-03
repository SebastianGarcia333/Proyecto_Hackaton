
var contenedorLineas = document.getElementById("lineasTicket");
var campoSubtotal = document.getElementById("subtotalTicket");
var campoDomicilio = document.getElementById("domicilioTicket");
var campoTotal = document.getElementById("totalTicket");
var botonVaciar = document.getElementById("botonVaciar");
var botonConfirmar = document.getElementById("botonConfirmar");
var mensajeFinal = document.getElementById("mensajeFinal");

var COSTO_DOMICILIO = 4000;

function mostrarTicket() {
  var ticket = obtenerTicket();
  var html = "";

  /* Si no hay productos, se muestra un mensaje y se apagan los botones */
  if (ticket.length === 0) {
    botonVaciar.disabled = true;
    botonConfirmar.disabled = true;
    contenedorLineas.innerHTML =
      '<div class="ticket-vacio ticket-vacio--grande">' +
        '<p>Todavía no pediste nada.</p>' +
        '<a class="boton-kase" href="index.html#menu">Ver el menú</a>' +
      '</div>';
    campoSubtotal.textContent = formatearPrecio(0);
    campoDomicilio.textContent = formatearPrecio(0);
    campoTotal.textContent = formatearPrecio(0);
    return;
  }

  botonVaciar.disabled = false;
  botonConfirmar.disabled = false;

  for (var i = 0; i < ticket.length; i++) {
    var linea = ticket[i];
    html = html +
      '<div class="linea-ticket linea-ticket--detalle">' +
        '<div>' +
          '<span class="linea-ticket__nombre">' + linea.nombre + '</span>' +
          '<small>' + formatearPrecio(linea.precio) + ' c/u</small>' +
        '</div>' +
        '<div class="linea-ticket__acciones">' +
          '<button type="button" class="boton-cantidad" onclick="restarProducto(' + linea.id + ')" aria-label="Quitar una unidad">−</button>' +
          '<span>' + linea.cantidad + '</span>' +
          '<button type="button" class="boton-cantidad" onclick="sumarProducto(' + linea.id + ')" aria-label="Agregar una unidad">+</button>' +
        '</div>' +
        '<strong class="linea-ticket__subtotal">' + formatearPrecio(linea.precio * linea.cantidad) + '</strong>' +
        '<button type="button" class="boton-cantidad boton-cantidad--borrar" onclick="eliminarProducto(' + linea.id + ')" aria-label="Eliminar producto">×</button>' +
      '</div>';
  }
  contenedorLineas.innerHTML = html;

  var subtotal = calcularTotal(ticket);
  campoSubtotal.textContent = formatearPrecio(subtotal);
  campoDomicilio.textContent = formatearPrecio(COSTO_DOMICILIO);
  campoTotal.textContent = formatearPrecio(subtotal + COSTO_DOMICILIO);
}

function sumarProducto(idProducto) {
  cambiarCantidad(idProducto, 1);
  mostrarTicket();
}

function restarProducto(idProducto) {
  cambiarCantidad(idProducto, -1);
  mostrarTicket();
}

function eliminarProducto(idProducto) {
  quitarDelTicket(idProducto);
  mostrarTicket();
}

function vaciarTicket() {
  guardarTicket([]);
  mostrarTicket();
}

/* Confirmar: simula el envío del pedido y deja el ticket en blanco */
function confirmarPedido() {
  var numeroPedido = Math.floor(1000 + Math.random() * 9000);
  guardarTicket([]);
  mostrarTicket();
  mensajeFinal.textContent = "Pedido #" + numeroPedido + " recibido. Ya lo estamos armando.";
  mensajeFinal.classList.add("mensaje-final--visible");
}

botonVaciar.onclick = vaciarTicket;
botonConfirmar.onclick = confirmarPedido;

mostrarTicket();
