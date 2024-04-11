import React, { useState } from "react";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar errores anteriores

    try {
      const response = await axios.post(
        "https://localhost:7010/api/Usuarios/login",
        {
          email: email,
          contraseña: password, // Asegúrate de que este nombre coincida con lo que tu backend espera
        }
      );

      const token = response.data.token;
      onLoginSuccess(token); // Podrías llamar a una función prop para manejar el éxito del login, como guardar el token en localStorage
    } catch (error) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un estado de error
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Error al conectar con el servicio de autenticación.");
      }
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          ></img>
          Flowbite
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <form onSubmit={handleSubmit}>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
