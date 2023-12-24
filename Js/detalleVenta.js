let fechaVenta = document.getElementById("fechaVenta")
let clienteVenta = document.getElementById("cliente")
let productoVenta = document.getElementById("producto")
let precioVenta = document.getElementById("precio")
let cantidadVenta = document.getElementById("cantidad")
let totalVenta = document.getElementById("total")
let imagenVenta = document.getElementById("imagen")


const datos = () => {
  const fecha = localStorage.getItem('Fecha de Venta')
  const cliente = localStorage.getItem('Cliente')
  const producto = localStorage.getItem('Producto')
  const precio = localStorage.getItem('Precio')
  const cantidad = localStorage.getItem('Cantidad')
  const total = localStorage.getItem('Total')
  const imagen = localStorage.getItem('Imagen')

  if(!fecha || !cliente || !producto || !precio || !cantidad || !total || !imagen)
  {
    window.location.pathname = '../html/ventas.html'
  }
  else
  {
    fechaVenta.textContent = fecha
    clienteVenta.textContent = cliente
    productoVenta.textContent = producto
    precioVenta.textContent = '$'+ precio
    cantidadVenta.textContent = cantidad
    totalVenta.textContent = '$' + total
    
    imagenVenta.innerHTML = `<img src="${imagen}" style="width:215px; height:215px">`
  }
}

datos()

const descargar = document.getElementById("descargar")

descargar.addEventListener("click", () => {
  print()

  imprimir()
})

const imprimir = () => 
{
  document.getElementById("volverVentas").style.display = "block"
  document.getElementById("descargar").style.display = "none"
}

const botonVolver = document.getElementById('volverVentas')

botonVolver.addEventListener("click", () => {
  window.location.pathname = '../html/carga.html'
  
  localStorage.setItem("path", 'detalleVentaToVentas')

  localStorage.removeItem('Fecha de Venta')
  localStorage.removeItem('Cliente')
  localStorage.removeItem('Producto')
  localStorage.removeItem('Precio')
  localStorage.removeItem('Cantidad')
  localStorage.removeItem('Total')
  localStorage.removeItem('Imagen')
})