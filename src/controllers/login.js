import axios from "axios";
const usersUrl = "http://localhost:3000/users";

export const login = async (params) => {
  try {
    const resp = await axios.get(usersUrl, {
      params: params
    });
    const users = resp.data;

    if (users.length === 0){
      alert("Usuario o contraseña invalidos");
      return false;
    }

    const user = users[0];
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuth", true);
    alert(`Hola ${user.name}`);
    return true;

  } catch (error) { 
    console.log(error);
    alert("Ocurrio algo inesperado");
  }
}