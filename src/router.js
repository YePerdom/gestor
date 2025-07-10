import { login } from "./controllers/login";

const routes = {
    "/": "/src/views/home.html",
    "/login": "/src/views/login.html",
    "/coders": "/src/views/coders.html",
    "/proyects": "/src/views/proyects.html",
    "/noFound": "/src/views/404.html"
}

export async function renderRoute() {
    const user = JSON.parse(localStorage.getItem("user"));
    const path = location.pathname;
    const isAuth = localStorage.getItem("isAuth");
    const app = document.getElementById("app");

    const file = routes[path];

    if (!path) {
        location.href = "/noFound";
        console.log("hola desde aquí");

        return;
    }

    if (!isAuth && path !== "/login") {
        location.pathname = "/login";
        return
    }

    if (isAuth && path === "/login") {
        location.pathname = "/";
        return;
    }

    try {
        const resp = await fetch(file);
        const html = await resp.text();
        app.innerHTML = html;

        if (path === "/login") {
            document.getElementById("mainHeader").hidden = true
            document.getElementById("loginForm").addEventListener("submit", async (e) => {
                e.preventDefault();
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;

                const params = {
                    email: email,
                    password: password
                };

                const login_ = await login(params);
                if (login_) {
                    location.href = "/";
                }
            });
        }

        document.getElementById("logOut").addEventListener("click", () => {
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
            location.href = "/login"
        })

        if (path === "/") {
            if (user.role === "ADMIN") {
                document.getElementById("navHeader").hidden = true;
                app.innerHTML = `
                <section>
                    <h2>coders</h2>
                    <a href="/coders"><img src="/public/usuario.png" alt="coders" ></a>
                </section>
                <section>
                    <h2>proyects</h2>
                    <a href="/proyects"><img src="/public/proyecto.png" alt="proyects"></a>
                </section>`;
            }

            if (user.role === "CODER") {
                document.getElementById("navHeader").hidden = true;
                app.innerHTML = `
                <section>
                    <h2>proyects</h2>
                    <a href="/proyects"><img src="/public/proyecto.png" alt="proyects"></a>
                </section>`;
            }
        }
    } catch (error) {
        console.log(error);
        location.href = "/noFound";
    }
}