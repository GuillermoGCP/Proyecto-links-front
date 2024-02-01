import { useState } from "react";
import useApiRequest from "../hooks/useApiRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useResetPassword = () => {
  const { fetchData } = useApiRequest();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  let tokenFromBack;
  let idFromBack;

  const onSuccessResetPass = (data) => {
    tokenFromBack = data.token;
    idFromBack = data.id;
    toast.success(data.message);
    setEmail("");
    const urlCheckPass = import.meta.env.VITE_SERVER_URL + "/checkPass";
    const urlDataCheckPass = {
      method: "POST",
      headers: {
        Authorization: tokenFromBack,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({idFromBack}),
    };
    console.log(urlDataCheckPass);

    // Aquí se realiza la segunda solicitud a "/checkPass"
    const onSuccessCheckPass = (data) => {
      console.log("exito");
      navigate("/newPass");
      toast.success(data.message);
    };

    const onErrorCheckPass = (error) => {
      console.log("fracaso");
      toast.error(error.error);
    };

    fetchData(
      urlCheckPass,
      urlDataCheckPass,
      onSuccessCheckPass,
      onErrorCheckPass
    );
  };

  const onErrorResetPass = (error) => {
    toast.error(error.error);
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    const urlResetPass = import.meta.env.VITE_SERVER_URL + "/resetPass";
    const urlDataResetPass = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    };

    fetchData(
      urlResetPass,
      urlDataResetPass,
      onSuccessResetPass,
      onErrorResetPass
    );
  };

  return {
    email,
    setEmail,
    handleEmail,
    tokenFromBack,
    idFromBack,
  };
};

export default useResetPassword;
