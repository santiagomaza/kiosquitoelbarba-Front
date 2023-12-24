let nombreCompleto = document.getElementById("nombreCompleto")
let email = document.getElementById("email")
let nombreUsuario = document.getElementById("nombreUsuario")
let contraseña = document.getElementById("contraseña")
let repetirContraseña = document.getElementById("repContraseña")

let botonRegistrarse = document.getElementById("btnRegistrarse")

botonRegistrarse.addEventListener("click", (e) => {
  e.preventDefault()

  validarCampos()
})

const validarCampos = () => 
{
  let nombreCompletoValor = nombreCompleto.value.trim()
  let emailValor = email.value.trim()
  let nombreUsuarioValor = nombreUsuario.value.trim();
  let contraseñaValor = contraseña.value.trim();
  let repetirContraseñaValor = repetirContraseña.value.trim()

  !nombreCompletoValor ? validaFalla(nombreCompleto, "Debes ingresar tu nombre completo") : validaOk(nombreCompleto)

  !emailValor ? validaFalla(email, "Debes ingresar un email") : validaOk(email)

  !nombreUsuarioValor ? validaFalla(nombreUsuario, "Debes ingresar el nombre de usuario") : validaOk(nombreUsuario);
  
  !contraseñaValor ? validaFalla(contraseña, "Debes ingresar la contraseña") : validaOk(contraseña);

  !repetirContraseñaValor ? validaFalla(repetirContraseña, "Debes ingresar de nuevo la contraseña") : validaOk(repetirContraseña)
   
  if(nombreUsuarioValor !== ""  && contraseñaValor !== "" && nombreCompletoValor !== "" || emailValor !== "" || repetirContraseñaValor !== "")
  {
    registrarse(nombreCompletoValor, emailValor, nombreUsuarioValor, contraseñaValor, repetirContraseñaValor)  
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

const registrarse = async (nombreCompletoValor, emailValor, nombreUsuarioValor, contraseñaValor, repetirContraseñaValor) => 
{
  const usuarios = await axios.get("https://kiosquitoelbarba-backend.onrender.com/usuarios/")

  const resultados = usuarios.data

  const busquedaUsuario = resultados.find(usuario => usuario.email === emailValor)

  if(nombreCompletoValor === "" || emailValor === "" || nombreUsuarioValor === "" || contraseñaValor === "" || repetirContraseñaValor === ""){
    validarCampos()
  }
  else if(busquedaUsuario)
  {
    Swal.fire({
      "icon": "warning",
      "text": "El email que esta intentando ingresar ya esta registrado. Intentelo de nuevo"
    })
  }
  else if(contraseñaValor !== repetirContraseñaValor){
    Swal.fire({
      "icon": "error",
      "title": "Las contraseñas no coinciden"
    })
  }
  else
  {
    axios.post("https://kiosquitoelbarba-backend.onrender.com/usuarios/", {
      role: "user",
      nombre: nombreCompletoValor,
      email: emailValor,
      usuario: nombreUsuarioValor,
      contraseña: repetirContraseñaValor
    })

    Swal.fire({
      "icon": "success",
      "title": `Usuario ${nombreUsuarioValor} creado con exito`,
      showConfirmButton: false,
      timer: 2000
    })

    setTimeout(() => {
      window.location.href = "../html/login.html"
    }, 2500);
  }
}

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

const icono2 = document.getElementById("eye2");

icono2.addEventListener("click", () =>
{
  if (repetirContraseña.type === "password") 
  {
    repetirContraseña.type = "text";
    icono.classList.remove("bi-eye-slash");
    icono.classList.add("bi-eye");
  } 
  else 
  {
    repetirContraseña.type = "password";
    icono.classList.add("bi-eye-slash");
    icono.classList.remove("bi-eye");
  }
});

