import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button/index.jsx";
import Input from "../../components/atoms/input/index.jsx";
import "../../styles/signIn.css";
import { useAuth } from "../../context/auth";
import { useForm } from "react-hook-form";
import { Logotipo } from "../../components/atoms/logotipo/index.jsx";

export function SignIn() {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const isSuccess = await signIn(data);

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
            <Logotipo />
          </div>
          <div className="text-animated">
            <p className="animated">ROTAVERDE</p>
          </div>
        </div>
        <div className="content-sign-in">
          <div>
            <h1 className="h1-sign-in">Faça seu login / cadastro</h1>
            <h2 className="h2-sign-in">
              E salve todos os seus locais visitados
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
            
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
