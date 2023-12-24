let id = 0

const form = document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()
})

let fecha = document.getElementById("fechaVenta")
let cliente = document.getElementById("cliente")
let producto = document.getElementById("producto")
let precio = document.getElementById("precioProd")
let cantidad = document.getElementById("cantidadLlevar")
let imagen = document.getElementById("imagen")

let total = document.getElementById("totalPagar").value = cantidad * precio

const botonAgregar = document.getElementById("agregarVenta").addEventListener("click", (e) => 
{
    e.preventDefault()

    validarCampos()
})

const validarCampos = () => 
{   
    let fechaVenta = fecha.value.trim()
    let clienteVenta = cliente.value.trim()
    let productoVenta = producto.value.trim()
    let precioVenta = precio.value.trim()
    let cantidadVenta = cantidad.value.trim()
    let imagenVenta = imagen.value.trim()

    let total = document.getElementById("totalPagar").value = cantidadVenta * precioVenta
   
    !fechaVenta ? validarFalla(fecha, "Debes ingresar la fecha") : validaOk(fecha)

    !clienteVenta ? validarFalla(cliente, "Debes ingresar el cliente") : validaOk(cliente)

    !productoVenta ? validarFalla(producto, "Debes ingresar el producto") : validaOk(producto)
    
    !precioVenta ? validarFalla(precio, "Debes ingresar el precio de venta") : validaOk(precio)

    !cantidadVenta ? validarFalla(cantidad, "Debes ingresar la cantidad") : validaOk(cantidad)

    !imagenVenta ? validarFalla(imagen, "Debes ingresar una URL") : validaOk(imagen)
 
    if(fechaVenta !== "" && clienteVenta !== "" && productoVenta !== "" && precioVenta !== "" && cantidadVenta !== "" && imagenVenta !== "" && total !== "")
    {
        agregarVenta(fechaVenta, clienteVenta, productoVenta, precioVenta, cantidadVenta, imagenVenta, total)
    }
}


const validarFalla = (input, msje) => 
{
    const formControl = input.parentElement
    const aviso = formControl.querySelector("p")
    aviso.innerText = msje

    formControl.className = "campos incorrectos"
}


const validaOk = (input) => 
{
    const formControl = input.parentElement
    formControl.className = "campos validos"
}

const getVentas = async () => {
    const datos = await axios.get('https://kiosquitoelbarba-backend.onrender.com/ventas')

    const resultados = datos.data

    return resultados
} 

getVentas()

const barraBuscadora = async () => {
    const buscador = document.getElementById("buscador")

    const valor = buscador.value.toLowerCase()

    const filtroVentas = await filtroBusqueda(valor) 

    return filtroVentas
}

const filtroBusqueda = async (valor) => {
    const ventas = await getVentas()

    let caracteres = valor

    const filtro = ventas.filter(venta => venta.fecha.toLowerCase().includes(`${caracteres}`) || venta.cliente.toLowerCase().includes(`${caracteres}`) || venta.producto.toLowerCase().includes(`${caracteres}`) || venta.precio.toLowerCase().includes(caracteres))

    const filtrarVenta = filtro.map(venta => 
        document.getElementById("tablaVentas").innerHTML =
        `
        <tr>
          <th scope="row" class="text-center">${venta.id}</th>
          <td class="text-center">${venta.fecha}</td>
          <td class="text-center">${venta.cliente}</td>
          <td class="text-center">${venta.producto}</td>
          <td class="text-center">$${venta.precio}</td>
          <td class="text-center">${venta.cantidad}</td>
          <td class="text-danger text-center fw-bold">$${venta.total}</td>
          <td class="text-center"><img src=${venta.imagen} style="height:150px; width:150px;"></td>
          <td class="text-center filas">
            <button class="btn btn-danger mt-2" id="Eliminar()" onclick=eliminar(${venta.id})><i class="bi bi-trash2-fill borrar fs-4"></i></button>
            <button class="btn btn-primary mx-2 mt-2" onclick="editar(${venta.id},'${venta.fecha}', '${venta.cliente}', '${venta.producto}', '${venta.precio}', '${venta.cantidad}','${venta.imagen}')"><i class="bi bi-pen-fill fs-4 editar"></i></button>
          </td>
        </tr>
        `)

    tablaVentas.innerHTML = filtrarVenta.join('')
}

const mostrarVentas = () => 
{
   axios.get("https://kiosquitoelbarba-backend.onrender.com/ventas")
   .then(resp => 
    {
     document.getElementById("tablaVentas").innerHTML = ""

      resp.data.map(venta => 
        {
            document.getElementById("tablaVentas").innerHTML += 
            `
            <tr>
             <th scope="row" class="text-center">${venta.id}</th>
             <td class="text-center">${venta.fecha}</td>
             <td class="text-center">${venta.cliente}</td>
             <td class="text-center">${venta.producto}</td>
             <td class="text-center">$${venta.precio}</td>
             <td class="text-center">${venta.cantidad}</td>
             <td class="text-danger text-center fw-bold">$${venta.total}</td>
             <td class="text-center"><img src=${venta.imagen} style="height:150px; width:150px;"></td>
             <td class="text-center filas">
               <button class="btn btn-danger mt-2" id="Eliminar()" onclick=eliminar(${venta.id})><i class="bi bi-trash2-fill borrar fs-4"></i></button>
               <button class="btn btn-primary mx-2 mt-2" onclick="editar(${venta.id},'${venta.fecha}', '${venta.cliente}', '${venta.producto}', '${venta.precio}', '${venta.cantidad}','${venta.imagen}')"><i class="bi bi-pen-fill fs-4 editar"></i></button>
               <a class="botonDV" href="../html/detalleVenta.html" target="_blank"><button class="btn btn-secondary mt-2" onclick="descargar(${venta.fecha}, '${venta.cliente}', '${venta.producto}', '${venta.precio}', '${venta.cantidad}', '${venta.total}', '${venta.imagen}')"><i class="bi bi-file-earmark-arrow-down-fill fs-4 descargar text-white"></i></button></a>
             </td>
            </tr>
            `
        })
    })
}
mostrarVentas()

const mostrarProductos = () => 
{
    axios.get("https://kiosquitoelbarba-backend.onrender.com/productos")
    .then(resp => {
        resp.data.map(producto => {
            document.getElementById("producto").innerHTML += 
            `
                <option value="${producto.NombreProducto}" id="producto1">${producto.NombreProducto}</option>
            `            
        })
    })
}
mostrarProductos()

const mostrarClientes = () => 
{
    axios.get("https://kiosquitoelbarba-backend.onrender.com/clientes")
    .then(resp => {
        resp.data.map(cliente => {
            document.getElementById("cliente").innerHTML += 
            `
                <option value="${cliente.NombreYApellido}">${cliente.NombreYApellido}</option>
            `
        })
    })
}

mostrarClientes()

const productoSeleccionado = () => {
    
    axios.get("https://kiosquitoelbarba-backend.onrender.com/productos")
    .then(resp => {
        resp.data.map(producto => {
            const select = document.getElementById("producto")
            const selectedOption = select.options[producto.PrecioProducto.selectedIndex]
        
            const inputPrecio = document.getElementById("precioProd")

            inputPrecio.value = selectedOption
            
        })
    })
}

const descargar = (fecha, cliente, producto, precio, cantidad, total, imagen) => 
{
    localStorage.setItem('Fecha de Venta', fecha.toString())
    localStorage.setItem('Cliente', cliente)
    localStorage.setItem('Producto', producto)
    localStorage.setItem('Precio', precio)
    localStorage.setItem('Cantidad', cantidad)
    localStorage.setItem('Total', total)
    localStorage.setItem('Imagen', imagen.toString())
}

const agregarVenta = (fechaVenta, clienteVenta, productoVenta, precioVenta, cantidadVenta, imagenVenta, total) => 
{
    setTimeout(() => {
        axios.post('https://kiosquitoelbarba-backend.onrender.com/ventas/',
        {
            fecha: fechaVenta,
            cliente: clienteVenta,
            producto: productoVenta,
            precio: precioVenta,
            cantidad: cantidadVenta,
            imagen: imagenVenta,
            total
        })
        .then(resp => console.log(resp.data))
        .catch(err => console.error(err))
        
    }, 1000);

    Swal.fire({
        icon: "success",
        title: "Venta agregada correctamente",
        showConfirmButton: false,
        timer: 2000
    })

    setTimeout(() => {
        window.location.reload()
    }, 2000);
}

const eliminar = (id) =>
{
   Swal.fire({
    text: "¿Estas seguro de que quieres borrar esta venta?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#F30914",
    cancelButtonColor: "#606060",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) 
    {   
        setTimeout(() => {
            axios.delete('https://kiosquitoelbarba-backend.onrender.com/ventas/' + id) 
        }, 1000);

        Swal.fire({  
            title: "Venta eliminada correctamente",
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

const editar = (id,fecha,cliente,producto,precio,cantidad,imagen) =>
{
    Id = id

    document.getElementById("fechaVenta").value = fecha;
    document.getElementById("cliente").value = cliente;
    document.getElementById("producto").value = producto;
    document.getElementById("precioProd").value = precio;
    document.getElementById("cantidadLlevar").value = cantidad;
    document.getElementById("imagen").value = imagen;

    document.getElementById("agregarVenta").style.display = "none"
    document.getElementById("actualizar").style.display = "inline-block"
}

const actualizar = () => 
{   
    let fecha = document.getElementById("fechaVenta").value
    let cliente = document.getElementById("cliente").value
    let producto = document.getElementById("producto").value
    let precio = document.getElementById("precioProd").value
    let cantidad = document.getElementById("cantidadLlevar").value
    let imagen = document.getElementById("imagen").value

    let total = precio*cantidad
    
    Swal.fire({
        text: "¿Estas seguro de que quieres editar esta venta?",
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
            axios.put('https://kiosquitoelbarba-backend.onrender.com/ventas/' + Id,
            {
              fecha,
              cliente,
              producto,
              precio,
              cantidad,
              imagen,
              total
            })
          }, 1000);

          Swal.fire({
            title: "Venta editada correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
          
          setTimeout(() => {
            window.location.reload()
          }, 1500);

        }
    });  
}
document.getElementById("actualizar").addEventListener("click",actualizar) 

path = localStorage.getItem('path')

if(path == 'kioscoToVentas' || path == 'productosToVentas' || path == 'clientesToVentas' || path == 'detalleVentaToVentas' || path == "usuariosToVentas")
{
    //localStorage.removeItem('path')
}
else if(path !== './html/login.html')
{
    window.location.pathname = '../html/login.html'
    localStorage.clear()
}

const pagKiosco = () => {
    localStorage.setItem('path', 'ventasToKiosco')
}

const pagClientes = () => {
    localStorage.setItem('path', 'ventasToClientes')
}

const pagProductos = () => {
    localStorage.setItem('path', 'ventasToProductos')
}

const pagUsuarios = () => {
    localStorage.setItem("path", "ventasToUsuarios")
}

const botonSalir = document.getElementById("salir")

botonSalir.addEventListener("click", () => {
  window.location.pathname = './html/login.html'
  localStorage.clear()
})


const role = localStorage.getItem("role")

if(role === "")
{
  window.location.pathname = "../html/login.html"
}
else if(role == "user")
{
  window.location.pathname = "./kiosco.html"
}