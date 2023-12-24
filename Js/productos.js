const obtenerProductos = () => 
{
  axios.get("https://kiosquitoelbarba-backend.onrender.com/productos")
  .then(resp => 
    {
      resp.data.map(producto => 
        {
          document.getElementById("tablaProductos").innerHTML += 
          `
            <tr>
              <td>${producto.id}</td>
              <td class="fw-bold">${producto.NombreProducto}</td>
              <td class="fw-bold text-danger">$${producto.PrecioProducto}</td>
              <td class="text-success fw-bold">${producto.Cantidad}</td>
              <td><img src="${producto.imagen}" style="height:150px; width:150px;"></td>
              <td class="text-center filas">
               <button class="btn btn-danger mt-2" id="Eliminar()" onclick=eliminar(${producto.id})><i class="bi bi-trash2-fill borrar fs-4"></i></button>
               <button class="btn btn-primary mx-2 mt-2" data-bs-toggle="modal" data-bs-target="#editarProductos${producto.id}"><i class="bi bi-pen-fill fs-4 editar"></i></button>
             </td>
            </tr>

            <div class="modal fade text-center" id="editarProductos${producto.id}" tabindex="-1" aria-labelledby="editarModalLabel${producto.id}" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editarModalLabel${producto.id}">Editar Producto</h1>
                  </div>
                  <div class="modal-body">
                    <form action="">
                      <div class="campos">
                        <label for="eNombreProducto${producto.id}" class="d-block mb-2">Nombre Producto</label>
                        <input type="text" autocomplete="off" name="Nombre" value="${producto.NombreProducto}" id="eNombreProducto${producto.id}" required>
                        <p></p>
                      </div>
                      <div class="campos">
                        <label for="ePrecioProducto${producto.id}" class="d-block">Precio del Producto</label>
                        <input type="number" autocomplete="off" name="Precio" value="${producto.PrecioProducto}" id="ePrecioProducto${producto.id}" required>
                        <p></p>
                      </div>
                      <div class="campos">
                        <label for="eStockProducto${producto.id}" class="d-block">Stock</label>
                        <input type="number" autocomplete="off" name="stock" value="${producto.Cantidad}" id="eStockProducto${producto.id}" required>
                        <p></p>
                      </div>
                      <div class="campos">
                        <label for="eUrlImagen"${producto.id}" class="d-block">Imagen</label>
                        <input type="url" autocomplete="off" name="url" value="${producto.imagen}" id="eUrlImagen${producto.id}" required>
                        <p></p>
                      </div>
                      <hr>
                      <div class="mt-2 d-flex justify-content-end">
                        <button type="button" class="btn btn-primary" onclick="editar(${producto.id})">Editar Producto</button>
                        <button type="reset" class="btn btn-danger mx-1" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          `
        })
    })
}

obtenerProductos()

const agregarProducto = () => {
  let NombreProducto = document.getElementById("nombreProducto").value
  let PrecioProducto = document.getElementById("precioProducto").value
  let Cantidad = document.getElementById("stockProducto").value
  let imagen = document.getElementById("urlImagen").value

  if(NombreProducto == "" || PrecioProducto == "" || Cantidad == "" || imagen == ""){
    Swal.fire({
      icon: "warning",
      text: "Debes rellenar los campos"
    })
  }
  else
  {
    axios.post("https://kiosquitoelbarba-backend.onrender.com/productos/", {
      NombreProducto,
      PrecioProducto,
      Cantidad,
      imagen
    })
    .then(resp => {console.log(resp)})
    .catch(err => console.error(err))   
    
    Swal.fire({
      icon: "success",
      title: `Producto ${NombreProducto} agregado correctamente`,
      showConfirmButton: false,
      timer: 2000
    })

    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }
}

const eliminar = id => 
{
  Swal.fire({
    text: "¿Estas seguro de que quieres borrar este producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#F30914",
    cancelButtonColor: "#606060",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) 
    {   
      setTimeout(() => 
      {
        axios.delete(`https://kiosquitoelbarba-backend.onrender.com/productos/${id}`) 
      }, 1000);

      Swal.fire({  
        title: "Producto eliminado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      })
      
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    }
  });
}

const editar = id => {
  const NombreProducto = document.getElementById(`eNombreProducto${id}`).value
  const PrecioProducto = document.getElementById(`ePrecioProducto${id}`).value
  const Cantidad = document.getElementById(`eStockProducto${id}`).value
  const imagen = document.getElementById(`eUrlImagen${id}`).value
  
  Swal.fire({
    text: "¿Estas seguro de que quieres editar este producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3333ff",
    cancelButtonColor: "#606060",
    confirmButtonText: "Editar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) 
    {
      setTimeout(() => {
        axios.put(`https://kiosquitoelbarba-backend.onrender.com/productos/${id}` ,
        {
          NombreProducto,
          PrecioProducto,
          Cantidad,
          imagen
        })
      }, 1000);

      Swal.fire({
        title: "Producto editado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });
    }

    setTimeout(() => {
      window.location.reload()
    }, 1500);
});  
}

const getProductos = async () => {
  const productos = await axios.get("https://kiosquitoelbarba-backend.onrender.com/productos/")

  const resultados = productos.data

  return resultados
}

const barraBuscadora = async () => {
  const barraBusqueda = document.getElementById("buscador")

  const valor = barraBusqueda.value.toLowerCase()

  const filtroDeProductos = await filtroProductos(valor)

  return filtroDeProductos
}

const filtroProductos = async (valor) => {
  const productos = await getProductos()

  let caracteres = valor

  const filtro = productos.filter(producto => producto.NombreProducto.toLowerCase().includes(`${caracteres}`) || producto.PrecioProducto.toString().toLowerCase().includes(`${caracteres}`))

  const tablaProductos = document.getElementById("tablaProductos")

  const busquedaProductos = filtro.map(producto => `
  <tr>
    <td>${producto.id}</td>
    <td class="fw-bold">${producto.NombreProducto}</td>
    <td class="fw-bold text-danger">$${producto.PrecioProducto}</td>
    <td class="text-success fw-bold">${producto.Cantidad}</td>
    <td><img src="${producto.imagen}" style="height:150px; width:150px;"></td>
    <td class="text-center filas">
     <button class="btn btn-danger mt-2" id="Eliminar()" onclick=eliminar(${producto.id})><i class="bi bi-trash2-fill borrar fs-4"></i></button>
     <button class="btn btn-primary mx-2 mt-2" data-bs-toggle="modal" data-bs-target="#editarProductos${producto.id}"><i class="bi bi-pen-fill fs-4 editar"></i></button>
   </td>
  </tr>

  <div class="modal fade text-center" id="editarProductos${producto.id}" tabindex="-1" aria-labelledby="editarModalLabel${producto.id}" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editarModalLabel${producto.id}">Editar Producto</h1>
      </div>
      <div class="modal-body">
        <form action="">
          <div class="campos">
            <label for="eNombreProducto${producto.id}" class="d-block mb-2">Nombre Producto</label>
            <input type="text" autocomplete="off" name="Nombre" value="${producto.NombreProducto}" id="eNombreProducto${producto.id}" required>
            <p></p>
          </div>
          <div class="campos">
            <label for="ePrecioProducto${producto.id}" class="d-block">Precio del Producto</label>
            <input type="number" autocomplete="off" name="Precio" value="${producto.PrecioProducto}" id="ePrecioProducto${producto.id}" required>
            <p></p>
          </div>
          <div class="campos">
            <label for="eStockProducto${producto.id}" class="d-block">Stock</label>
            <input type="number" autocomplete="off" name="stock" value="${producto.Cantidad}" id="eStockProducto${producto.id}" required>
            <p></p>
          </div>
          <div class="campos">
            <label for="eUrlImagen"${producto.id}" class="d-block">Imagen</label>
            <input type="url" autocomplete="off" name="url" value="${producto.imagen}" id="eUrlImagen${producto.id}" required>
            <p></p>
          </div>
          <hr>
          <div class="mt-2 d-flex justify-content-end">
            <button type="button" class="btn btn-primary" onclick="editar(${producto.id})">Editar Producto</button>
            <button type="reset" class="btn btn-danger mx-1" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  </div>
`

)
  tablaProductos.innerHTML = busquedaProductos.join("")
} 

let path = localStorage.getItem("path")

if(path == 'kioscoToProductos' || path == 'clientesToProductos' || path == 'ventasToProductos' || path == "usuariosToProductos")
{
  //localStorage.removeItem('path')
}
else if(path !== 'loginToKiosco')
{
  window.location.pathname = '../index.html'
  localStorage.clear()
}

const pagKiosco = () => {
  localStorage.setItem('path', 'productosToKiosco')
}

const pagVentas = () => {
  localStorage.setItem('path', 'productosToVentas')
}

const pagClientes = () => {
  localStorage.setItem('path', 'productosToClientes')
}

const pagUsuarios = () => {
  localStorage.setItem('path', 'productosToUsuarios')
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