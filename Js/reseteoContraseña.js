const nuevaContraseña = document.getElementById("nuevaContraseña")
const repetirContraseña = document.getElementById("repContraseña")

const botonContinuar = document.getElementById("btnContinuar")

botonContinuar.addEventListener("click", (e) => {
  e.preventDefault()

  validarCampos()
})

const botonResetear = document.getElementById("btnReestablecer")

botonResetear.addEventListener("click", (e) => {
  e.preventDefault()

  validarCamposContraseñas()
})

const validarCampos = () => {
  let nombreUsuarioValor = nombreUsuario.value

  let emailValor = email.value

  !nombreUsuarioValor ? validaFalla(nombreUsuario, "Debes ingresar el nombre de usuario") : validaOk(nombreUsuario)

  !emailValor ? validaFalla(email, "Debes ingresar el email") : validaOk(email) 

  if((emailValor == "" && nombreUsuarioValor !== "") || (emailValor !== "" && nombreUsuarioValor == "")){
    validaOk(email)
    validaOk(nombreUsuario)
  }
}

const validarCamposContraseñas = () => {
  let nuevaContraseñaValor = nuevaContraseña.value
  let repetirContraseñaValor = repetirContraseña.value

  !nuevaContraseñaValor ? validaFalla(nuevaContraseña, "Debes ingresar una contraseña") : validaOk(nuevaContraseña)

  !repetirContraseñaValor ? validaFalla(repetirContraseña, "Debes ingresar de nuevo la contraseña") : validaOk(repetirContraseña)
  
}

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

const buscarUsuario = async () => {
  const nombreUsuario = document.getElementById("nombreUsuario").value.trim()
  const email = document.getElementById("email").value.trim()

  const usuarios = await axios.get("https://kiosquitoelbarba-backend.onrender.com/usuarios")

  const resultados = usuarios.data

  const user = resultados.find(usuario => usuario.usuario === nombreUsuario)
  const userEmail = resultados.find(usuario => usuario.email === email)

  if(user){
    document.getElementById("formContraseña").style.display = "block"
    document.getElementById("formContraseñaRep").style.display = "block"

    document.getElementById("formEmail").style.display = "none"

    document.getElementById("texto").style.visibility = "hidden"
    document.getElementById("form").classList.add("formulario2")

    document.getElementById("textoContraseña").style.visibility = "visible"
    
    document.getElementById("container").style.height = "535px"
    document.getElementById("container").style.marginTop = "75px"

    document.getElementById("btnContinuar").style.display = "none"
    document.getElementById("btnReestablecer").style.display = "block"
  }
  else if(userEmail){
    document.getElementById("formContraseña").style.display = "block"
    document.getElementById("formContraseñaRep").style.display = "block"

    document.getElementById("formNombreUsuario").style.display = "none"

    document.getElementById("texto").style.visibility = "hidden"
    document.getElementById("form").classList.add("formulario2")

    document.getElementById("textoContraseña").style.visibility = "visible"
    
    document.getElementById("container").style.height = "535px"
    document.getElementById("container").style.marginTop = "75px"

    document.getElementById("btnContinuar").style.display = "none"
    document.getElementById("btnReestablecer").style.display = "block"
  }
  else if(nombreUsuario == "" && email == ""){
    validarCampos(nombreUsuario, email)
  }
  else if(!user && email == ""){
    Swal.fire({
      "icon": "error",
      "text": `No se pudo encontrar el usuario ${nombreUsuario}`,
      allowOutsideClick: false
    })
  }
  else if(!userEmail && nombreUsuario == ""){
    Swal.fire({
      "icon": "error",
      "text": `No se pudo encontrar el email ${email}`
    })
  }
  else if(nombreUsuario !== "" && email !== ""){
    alert("Elige uno por favor")
  }
}

const reestablecerContraseña = async () => {
  const nombreUsuario = document.getElementById("nombreUsuario").value.trim()

  const email = document.getElementById("email").value.trim()

  const nuevaContraseña = document.getElementById("nuevaContraseña").value.trim()

  const repetirContraseña = document.getElementById("repContraseña").value.trim()

  const usuarios = await axios.get("https://kiosquitoelbarba-backend.onrender.com/usuarios")

  const resultados2 = usuarios.data

  const users = resultados2.find(user => user.usuario === nombreUsuario || user.email === email)
  
  const contraseñas = resultados2.find(usuario => usuario.contraseña === nuevaContraseña)

  if(nuevaContraseña === "" || repetirContraseña === "")
  {
    validarCamposContraseñas(nuevaContraseña, repetirContraseña)
  }  
  else if(nuevaContraseña !== repetirContraseña){
    Swal.fire({
      "title": "Las contraseñas no coinciden",
      "icon": "error"
    })
  }
  else if(contraseñas)
  {
    Swal.fire({
      "icon": "warning",
      "text": "La contraseña que estas ingresando no puede ser igual a la anterior"
    })
  }
  else
  {
    axios.patch(`https://kiosquitoelbarba-backend.onrender.com/usuarios/${users.id}`, 
    {
      contraseña: repetirContraseña
    })

    Swal.fire({
      "icon": "success",
      "title": "Contraseña actualizada correctamente",
      showConfirmButton: false,
      timer: 2000
    })

    setTimeout(() => {
      window.location.pathname = "../html/login.html"
    }, 2700);

  }
}

const nuevaContraseña1 = document.getElementById("nuevaContraseña")
const repetirContraseña1 = document.getElementById("repContraseña")

const icono = document.getElementById("eye");
const icono2 = document.getElementById("eye2")

icono.addEventListener("click", () =>
{
  if (nuevaContraseña1.type === "password") 
  {
    nuevaContraseña1.type = "text";
    icono.classList.remove("bi-eye-slash");
    icono.classList.add("bi-eye");
  } 
  else 
  {
    nuevaContraseña1.type = "password";
    icono.classList.add("bi-eye-slash");
    icono.classList.remove("bi-eye");
  }
});

icono2.addEventListener("click", () => {
  if (repetirContraseña1.type === "password") 
  {
    repetirContraseña1.type = "text";
    icono.classList.remove("bi-eye-slash");
    icono.classList.add("bi-eye");
  } 
  else 
  {
    repetirContraseña1.type = "password";
    icono.classList.add("bi-eye-slash");
    icono.classList.remove("bi-eye");
  }
})

