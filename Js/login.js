
let nombreUsuario = document.getElementById("nombre");
let contraseña = document.getElementById("contraseña");

const icono = document.getElementById("eye");

icono.addEventListener("click", () =>
{
  if (contraseña.type === "password") 
  {
    contraseña.type = "text";
    icono.classList.remove("bi-eye-slash");
    icono.classList.add("bi-eye");
  } 
  else 
  {
    contraseña.type = "password";
    icono.classList.add("bi-eye-slash");
    icono.classList.remove("bi-eye");
  }
});

let botonIngresar = document.getElementById("btnIngresar");


botonIngresar.addEventListener("click", async (e) => 
{
  e.preventDefault();

  validarCampos();
});


const validarCampos = () => 
{
  let nombreUsuarioValor = nombreUsuario.value.trim();
  let contraseñaValor = contraseña.value.trim();

  !nombreUsuarioValor ? validaFalla(nombreUsuario, "Debes ingresar el nombre de usuario") : validaOk(nombreUsuario);
  
  !contraseñaValor ? validaFalla(contraseña, "Debes ingresar la contraseña") : validaOk(contraseña);
   
  if(nombreUsuarioValor !== ""  && contraseñaValor !== ""){
    ingresar(nombreUsuarioValor, contraseñaValor)  
  } 
};

const validaFalla = (input, msje) => {
  const formControl = input.parentElement;
  const aviso = formControl.querySelector("p");
  aviso.innerText = msje;

  formControl.className = "formulario falla";
};


const validaOk = (input) => {
  const formControl = input.parentElement;
  formControl.className = "formulario ok";
};


const obtenerUsuarios = async () => 
{
  const resultado = await axios.get("https://kiosquitoelbarba-backend.onrender.com/usuarios/")

  return resultado.data
}


const ingresar = async (nombreUsuarioValor, contraseñaValor) => 
{
  const datos = await obtenerUsuarios()

  const usuario = datos.find(user => user.usuario === nombreUsuarioValor)
  const contraseña = datos.find(user => user.contraseña === contraseñaValor)

  localStorage.setItem("path", 'loginToKiosco')

  if (contraseña && usuario) 
  {
    Swal.fire({
      title: `Bienvenido ${nombreUsuarioValor}!!`,
      icon: "success",
      showConfirmButton: false
    })
    
    localStorage.setItem("role", usuario.role)
    localStorage.setItem("usuario", usuario.usuario)

    setTimeout(() => {
      window.location.pathname = "../html/carga.html"; 
    }, 800);
  }
  else
  {
    Swal.fire({
      "icon": "error",
      "title": "Uno de los datos no coincide. Intentalo de nuevo"
    })
  }
};
