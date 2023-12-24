const mostrarClientes = () => 
{
  axios.get("https://kiosquitoelbarba-backend.onrender.com/clientes")
  .then(resp => 
    {
      resp.data.map(cliente => 
        {
          document.getElementById("tablaClientes").innerHTML += 
          `
            <tr>
              <td>${cliente.id}</td>
              <td>${cliente.NombreYApellido}</td>
              <td>${cliente.Edad}</td>
              <td>${cliente.Domicilio}</td>
            </tr>
          `
        })
    })
}

mostrarClientes()

let path = localStorage.getItem('path')

if(path == 'kioscoToClientes' || path == 'ventasToClientes' || path == 'productosToClientes' || path == "usuariosToClientes"){
  //localStorage.removeItem('path')
}
else if(path !== './html/login.html')
{
  window.location.pathname = '../index.html'
  localStorage.clear()
}

const pagKiosco = () => {
  localStorage.setItem('path', 'clientesToKiosco')
}

const pagVentas = () => {
  localStorage.setItem('path', 'clientesToVentas')
}

const pagProductos = () => {
  localStorage.setItem('path', 'clientesToProductos')
}

const pagUsuarios = () => {
  localStorage.setItem('path', 'clientesToUsuarios')
}

const botonSalir = document.getElementById("salir")

botonSalir.addEventListener("click", () => {
  window.location.pathname = '../index.html'
  localStorage.clear()
})


const role = localStorage.getItem("role")

if(role === "")
{
  window.location.pathname = "../index.html"
}
else if(role == "user")
{
  window.location.pathname = "../html/kiosco.html"
}