import useLogin from "../hooks/useLogin";
import EmailInput from "../components/EmailInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import Eye from "../components/Eye";
import ClosedEye from "../components/ClosedEye";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginHandler,
    showPassword,
    setShowPassword,
  } = useLogin();

  return (
    <>
      <article
        className="bg-cover min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100"
        style={{
          backgroundImage: 'url("clouds2.jpg")',
          minHeight: "100vh",
        }}
      >
        <div className="lg:w-1/2 mb-8 lg:mb-0 text-center">
          <h1 className="text-5xl font-extrabold mb-2 mt-4 text-indigo-700">
            Links World
          </h1>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 mt-2 text-gray-800">
            El mejor sitio para compartir, votar y descubrir sitios web
            interesantes
          </h2>
        </div>
        <div className="lg:w-1/2 bg-white p-8 lg:p-12 shadow-md rounded-md max-w-md w-full lg:ml-4">
          <h2 className="text-3xl font-semibold mb-6 text-center"></h2>
          <form className="space-y-4" onSubmit={loginHandler}>
            <div className="hover:scale-105 transition-transform">
              <Button className="mb-7 h-16">Iniciar sesión</Button>
            </div>
            <EmailInput
              email={email}
              setEmail={setEmail}
              placeholder="Correo electrónico"
            />
            <div className="flex ">
              <input
                placeholder={"Contraseña"}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div style={{ marginLeft: "-30px", marginTop: "12px" }}>
                <button
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                >
                  {showPassword ? <Eye /> : <ClosedEye />}
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500 text-center underline">
              <Popup />
            </div>

            <Link to="/register">
              <p className="block w-2/3 mx-auto rounded-md bg-green-500 px-4 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-green-400 focus:outline-none focus:ring focus:border-green-500 focus:ring-green-200 mt-7 hover:scale-105 transition-transform">
                Crea una cuenta nueva
              </p>
            </Link>
          </form>
        </div>
      </article>
    </>
  );
};

export default Login;
