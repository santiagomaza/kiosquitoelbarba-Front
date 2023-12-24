const role = localStorage.getItem("role")

if(role == "admim")
{
  document.getElementById("administracion").style.display = "inline-block"
}
else if(role == "user")
{
  document.getElementById("administracion").style.display = "none"
}
else if(role === "")
{
  window.location.pathname = '../index.html'
}

const path = localStorage.getItem("path")

if(path === "./html/login.html" || path == 'ventasToKiosco' || path == 'clientesToKiosco' || path == 'productosToKiosco' || path == "usuariosToKiosco"){}

else if(path !== "./html/login.html" || path !== 'ventasToKiosco' || path !== 'clientesToKiosco' || path !== 'productosToKiosco'){
  window.location.pathname = "../index.html"
  localStorage.clear()
}

const pagVentas = () => {
  localStorage.setItem("path", "kioscoToVentas")
}

const pagClientes = () => {
  localStorage.setItem("path", "kioscoToClientes")
}

const pagProductos = () => {
  localStorage.setItem("path", "kioscoToProductos")
}

const pagUsuarios = () => {
  localStorage.setItem("path", "kioscoToUsuarios")
}

const botonSalir = document.getElementById("salir")

botonSalir.addEventListener("click", () => {
  window.location.pathname = './index.html'
  localStorage.clear()
})

const mostrarCards = () => 
{
  axios.get("https://kiosquitoelbarba-backend.onrender.com/productos")
  .then(resp => 
    {
      resp.data.map(producto => 
        {
          document.getElementById("cards").innerHTML += 
          `
            <div class="d-flex justify-content-evenly col-lg-3 col-md-4 col-sm-12 mb-4">
              <div class="card" style="width: 18rem; height:33rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="..." style="height:280px;">
                <hr>
                <div class="card-body">
                  <h6 class="card-title"><strong style="color:#ff0000">Producto:</strong> ${producto.NombreProducto}</h6>
                  <p class="card-text precio"><strong style="color:#00cc00">Precio:</strong> $${producto.PrecioProducto}</p>
                  <p class="card-text"><strong>Stock Disponible:</strong> ${producto.Cantidad}</p>
                </div>
                <div class="d-flex justify-content-start">
                <a href = "./error.html" class=""><button type="button" class="btn btn-success boton px-4">Comprar</button></a>
                </div>
              </div>
            </div>
          `
        })
    })
}

mostrarCards()

const getProductos = async () => {
  const productos = await axios.get("https://kiosquitoelbarba-backend.onrender.com/productos")

  const resultados = productos.data
  
  return resultados
}

const barraBuscadora = async () => {
  const buscador = document.getElementById("buscador")

  const valor = buscador.value.toLowerCase()

  const filtroProductos = await filtroBusqueda(valor)

  return filtroProductos
}

const filtroBusqueda = async (valor) => {
  productos = await getProductos()

  const caracteres = valor

  const filtro = productos.filter(producto => producto.NombreProducto.toLowerCase().includes(`${caracteres}`) || producto.PrecioProducto.toString().includes(`${caracteres}`))

  const cardsProductos = document.getElementById("cards")

  const filtrarProducto = filtro.map(producto => `
  <div class="d-flex justify-content-center col-lg-3 col-md-4 col-sm-12 mb-4">
    <div class="card" style="width: 18rem; height:33rem;">
      <img src="${producto.imagen}" class="card-img-top" alt="..." style="height:280px;">
      <hr>
      <div class="card-body">
        <h6 class="card-title"><strong style="color:#ff0000">Producto:</strong> ${producto.NombreProducto}</h6>
        <p class="card-text precio"><strong style="color:#00cc00">Precio:</strong> $${producto.PrecioProducto}</p>
        <p class="card-text"><strong>Stock Disponible:</strong> ${producto.Cantidad}</p>
      </div>
      <div class="d-flex justify-content-start">
      <a href = "./html/error.html" class=""><button type="button" class="btn btn-success boton px-4">Comprar</button></a>
      </div>
    </div>
  </div>
`)

cardsProductos.innerHTML = filtrarProducto.join('')
}