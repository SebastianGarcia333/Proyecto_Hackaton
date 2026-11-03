

var CLAVE_TICKET = "kase_ticket";

function obtenerTicket() {
  var texto = localStorage.getItem(CLAVE_TICKET);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function guardarTicket(ticket) {
  localStorage.setItem(CLAVE_TICKET, JSON.stringify(ticket));
  actualizarContadores();
}

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CO");
}

function calcularTotal(ticket) {
  var total = 0;
  for (var i = 0; i < ticket.length; i++) {
    total = total + ticket[i].precio * ticket[i].cantidad;
  }
  return total;
}

function contarUnidades(ticket) {
  var unidades = 0;
  for (var i = 0; i < ticket.length; i++) {
    unidades = unidades + ticket[i].cantidad;
  }
  return unidades;
}

function cambiarCantidad(idProducto, cambio) {
  var ticket = obtenerTicket();
  var ticketNuevo = [];
  for (var i = 0; i < ticket.length; i++) {
    if (ticket[i].id === idProducto) {
      ticket[i].cantidad = ticket[i].cantidad + cambio;
    }
    if (ticket[i].cantidad > 0) {
      ticketNuevo.push(ticket[i]);
    }
  }
  guardarTicket(ticketNuevo);
}

function quitarDelTicket(idProducto) {
  var ticket = obtenerTicket();
  var ticketNuevo = [];
  for (var i = 0; i < ticket.length; i++) {
    if (ticket[i].id !== idProducto) {
      ticketNuevo.push(ticket[i]);
    }
  }
  guardarTicket(ticketNuevo);
}

function actualizarContadores() {
  var burbujas = document.querySelectorAll(".burbuja-ticket");
  var unidades = contarUnidades(obtenerTicket());
  for (var i = 0; i < burbujas.length; i++) {
    burbujas[i].textContent = unidades;
    burbujas[i].classList.remove("rebote");
    void burbujas[i].offsetWidth; // reinicia la animación
    burbujas[i].classList.add("rebote");
  }
}

window.onload = actualizarContadores;
