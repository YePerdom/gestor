import axios from "axios";
const usersUrl = "http://localhost:3000/users";

export const login = async ({email, password}) => {
  try {
    // debugger
    const resp = await axios.get(usersUrl, {
      params: { email, password }
    });
    console.log(resp.status);
    
    // alert("no llega respuesta")

    const users = await resp.data;

    if (users === 0){
      alert("Usuario o contraseña invalidos");
      return false;
    }

    debugger
    const user = users[0];
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuth", true);
    return true;

  } catch (error) { 
    console.log(error);
    alert("Ocurrio algo inesperado");
  }
}