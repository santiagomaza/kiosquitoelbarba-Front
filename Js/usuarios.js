const mostrarUsuarios = () => {
  axios.get("https://kiosquitoelbarba-backend.onrender.com/usuarios")
  .then(resp => {

     resp.data.sort((a,b) => a.id - b.id) 
     resp.data.map(usuario => {
      document.getElementById("tablaUsuarios").innerHTML += 
      `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.usuario}</td>
        <td>${usuario.contraseña}</td>
        <td>${usuario.role}</td>
        <td>
          <button class="btn btn-danger mt-2" id="Eliminar()" onclick="eliminarUsuario('${usuario.id}', '${usuario.usuario}')"><i class="bi bi-trash2-fill borrar fs-4"></i></button>
          <button class="btn btn-primary mx-2 mt-2"><i class="bi bi-pen-fill fs-4 editar"></i></button>
        </td>
      </tr>
      `
    })
  })
}

mostrarUsuarios()

const eliminarUsuario = async (id, usuario) => 
{ 
  const usuarioLS = localStorage.getItem("usuario")

  Swal.fire({
    text: `¿Estas seguro de que quieres borrar a ${usuario}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#F30914",
    cancelButtonColor: "#606060",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) 
    {
      if(id == 1 && usuarioLS == "admin"){
        Swal.fire({  
          title: "No puedes eliminarte siendo el administrador general",
          icon: "info",
        })
      }
      else if(id != 1 && usuarioLS == "admin")
      {
        axios.delete(`https://kiosquitoelbarba-backend.onrender.com/usuarios/${id}`)
  
        Swal.fire({  
          title: "Usuario eliminado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2000
      })
  
      setTimeout(() => {
        window.location.reload()
       }, 1500);
      }
      else if(id == 1 && usuarioLS != "admin")
      {
        Swal.fire({
          "icon": "error",
          "text": "No puedes eliminar al administrador general de la pagina"
        })
      }
      else if(role == "admin" && cantAdmin == 1)
      {
        Swal.fire({
          "icon": "warning",
          "text": "Debe haber al menos un administrador"
        })
      } 
      else{
        axios.delete(`https://kiosquitoelbarba-backend.onrender.com/usuarios/${id}`)
  
        Swal.fire({  
          title: "Usuario eliminado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2000
      })
  
      setTimeout(() => {
        window.location.reload()
       }, 1500);
      }
    }
  });  
}

const path = localStorage.getItem("path")

if(path === "kioscoToUsuarios" || path == "ventasToUsuarios" || path == "productosToUsuarios" || path == "clientesToUsuarios"){

}
else if(path !== 'loginToKiosco')
{
  window.location.pathname = '../index.html'
  localStorage.clear()
}

const pagKiosco = () => {
  localStorage.setItem("path", "usuariosToKiosco")
}

const pagVentas = () => {
  localStorage.setItem("path", "usuariosToVentas")
}

const pagClientes = () => {
  localStorage.setItem("path", "usuariosToClientes")
}

const pagProductos = () => {
  localStorage.setItem("path", "usuariosToProductos")
}

const botonSalir = document.getElementById("salir")

botonSalir.addEventListener("click", () => {
  window.location.pathname = '../index.html'
  localStorage.clear()
})

const role = localStorage.getItem("role")

if(role == "")
{
  window.location.pathname = "../index.html"
}
else if(role == "user")
{
  window.location.pathname = "../html/kiosco.html"
}