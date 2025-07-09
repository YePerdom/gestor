import { login } from "./controllers/login";

const routes = {
    "/" : "/src/views/home.html",
    "/login" : "/src/views/login.html",
    "/coders" : "/src/views/coders.html",
    "/proyects" : "/src/views/proyects.html",
    "/noFound" : "/src/views/404.html"
}

export async function renderRoute () {
    const user = JSON.stringify(localStorage.getItem("user"));
    const path = location.pathname;
    const isAuth = localStorage.getItem("isAuth");
    const app = document.getElementById("app");

    const file = routes[path];

    if(!path){
        debugger
        location.href = "/noFound";
        console.log("hola desde aquí");
        
        return;
    }

    if(!isAuth && path !== "/login"){
        location.pathname = "/login";
        return
    }

    if(isAuth && path === "/login"){
        location.pathname = "/";
        return;
    }

    try {
        const resp = await fetch(file);
        const html = await resp.text();

        app.innerHTML = html;

        if(path === "/login"){
            document.getElementById("mainHeader").hidden = true
            document.getElementById("loginForm").addEventListener("submit", (e) => {
                e.preventDefault();
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;

                const params = {
                    email : email,
                    password : password
                };

                const login_ = login(params);
                if(login_){
                    location.href = "/";
                }
            });
        }

        document.getElementById("logOut").addEventListener("click", () => {
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
            location.href = "/login"
        })
    } catch (error) {
        
    }
}