const path = localStorage.getItem("path")

if(path == 'ventasToKiosco' || path == 'clientesToKiosco' || path == 'productosToKiosco' || path == './html/login.html' || path == "usuariosToKiosco") //REDIRECCION A KIOSCO
{
  document.getElementById("texto").textContent = 'Redireccionando a Kiosco...'
  document.getElementById("texto").classList.add('textoKiosco')
  
  setTimeout(() => {
    window.location.pathname = '../html/kiosco.html'
  }, 1500);

}
else if(path == 'kioscoToVentas' || path == 'clientesToVentas' || path == 'productosToVentas' || path == 'detalleVentaToVentas' || path == "usuariosToVentas") //REDIRECCION A VENTAS
{
  document.getElementById("texto").textContent = 'Redireccionando a Ventas...'
  document.getElementById("texto").classList.add('textoVenta')
  
  setTimeout(() => {
    window.location.pathname = './html/ventas.html'
  }, 1500);

}
else if(path == 'kioscoToClientes' || path == 'ventasToClientes' || path == 'productosToClientes' || path == "usuariosToClientes") //REDIRECCION A CLIENTES
{
  document.getElementById("texto").textContent = 'Redireccionando a Clientes...'
  document.getElementById("texto").classList.add('textoCliente')
  
  setTimeout(() => {
    window.location.pathname = './html/clientes.html'
  }, 1500);

}
else if(path == 'kioscoToProductos' || path == 'ventasToProductos' || path == 'clientesToProductos' || path == "usuariosToProductos") //REDIRECCION A PRODUCTOS
{
  document.getElementById("texto").textContent = 'Redireccionando a Productos...'
  document.getElementById("texto").classList.add('textoProducto')
  
  setTimeout(() => {
    window.location.pathname = './html/productos.html'
  }, 1500);

}
else if(path === "kioscoToUsuarios" || path == "ventasToUsuarios" || path == "productosToUsuarios" || path == "clientesToUsuarios") //REDIRECCION A USUARIOS
{
  document.getElementById("texto").textContent = 'Redireccionando a Usuarios...'
  document.getElementById("texto").classList.add('textoUsuarios')

  setTimeout(() => {
    window.location.pathname = './html/usuarios.html'
  }, 1500);
}


