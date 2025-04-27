import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button/index.jsx";
import Input from "../../components/atoms/input/index.jsx";
import "../../styles/signIn.css";
import { useAuth } from "../../context/auth";
import { useForm } from "react-hook-form";
import { Logotipo } from "../../components/atoms/logotipo/index.jsx";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export function SignIn() {
   const recaptcha = useRef(null);
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    const captchaValue = recaptcha.current?.getValue();
  // localhost comentar esse trecho abaixo
    // if (!captchaValue) {
    //   alert("Por favor, confirme que você não é um robô.");
    //   return;
    // }

    try {
       // Enviando captchaValue junto se precisar validar no backend
       const isSuccess = await signIn({ ...data, captchaValue });
  
      if (isSuccess) {
        navigate("/dashboard");
      } else {
        alert("Email/senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Ocorreu um erro ao tentar fazer login.");
    }
  }

  return (
    <>
      <div className="container-sign-in">
        <div className="hero-sign-in">
          <div className="logotipo-sign-in">
            <Logotipo></Logotipo>
          </div>
          <div className="tex-animated">
            <p className="animated">ROTAVERDE</p>
          </div>
        </div>
        <div className="content-sign-in">
          <div>
            <h1 className="h1-sign-in">Faça seu login / cadastro</h1>
            <h2 className="h2-sign-in">
              E salve todos os seus locais visitados!
            </h2>
          </div>
          <form className="form-sign-in" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-sign-in">
              <Input
                label="Digite seu email:"
                placeholder="Email"
                type="email"
                {...register("email", { required: "O email é obrigatório" })}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}

              <Input
                label="Digite sua senha:"
                placeholder="Senha"
                type="password"
                {...register("password", { required: "A senha é obrigatória" })}
              />
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_SITE_KEY}
                ref={recaptcha}
              />
              <Button type="submit">Entrar</Button>

              <Link to="/cadastrar">
                <Button variant="secondary">Cadastre-se</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
