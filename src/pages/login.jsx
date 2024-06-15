import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  EyeIcon,
  GridContainer,
  GridForm,
  StyledFormContainer,
} from "@/styles/Login.style";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import User from "@/domain/entities/user";
import UserRepo from "@/infraestructure/implementation/httpRequest/axios/UserRepo";
import SignInUserUseCase from "@/application/usecases/userUseCase/SignInUserCase";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/actions/userActions";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const Login = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const [isShowPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = new User(null, null, data.email, data.password);
      const userRepo = new UserRepo(dispatch);
      const signInUseCase = new SignInUserUseCase(userRepo);
      const signInResponse = await signInUseCase.run(user);

      if (signInResponse && signInResponse.token) {
        dispatch(setUser(signInResponse));
        const encryptedToken = CryptoJS.AES.encrypt(
          signInResponse.token,
          "cookie-encrypted"
        ).toString();
        Cookies.set("authToken", encryptedToken, { expires: 1 / 24 });
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!isShowPassword);
  };

  return (
    <GridContainer>
      <StyledFormContainer>
        <h1 style={{ textAlign: "center", color: "#1e2533", fontSize: "24px" }}>
          Inicie sesión con su cuenta
        </h1>
        <GridForm onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Correo electronico:"
            name="email"
            control={control}
            fullWidth
          />
          <CustomInput
            label="Contraseña:"
            name="password"
            control={control}
            fullWidth
            icon={
              isShowPassword ? (
                <EyeIcon icon={faEyeSlash} onClick={togglePasswordVisibility} />
              ) : (
                <EyeIcon icon={faEye} onClick={togglePasswordVisibility} />
              )
            }
          />
          <div style={{ paddingTop: "20px" }}>
            <CustomButton text={"Iniciar Sesion"} type="submit" fullWidth />
          </div>
        </GridForm>
        <div
          style={{
            color: "black",
            display: "flex",
            justifyContent: "start",
            paddingLeft: 23,
            paddingTop: 15,
          }}
        >
          No cuentas con una cuenta?{"  "}
          <a href="/register" style={{ color: "#f27d16" }}>
            Registrate
          </a>
        </div>
      </StyledFormContainer>
    </GridContainer>
  );
};

export default Login;
