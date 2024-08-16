import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button";
import Input from "../../components/atoms/input";
import "../../styles/signUp.css";
import { useAuth } from "../../context/auth";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logotipo } from "../../components/atoms/logotipo";

// Definindo o esquema de validação com Yup
const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d+$/, "CPF deve conter apenas números")
    .length(11, "CPF deve ter exatamente 11 números")
    .required("CPF é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  data_nascimento: yup.date().nullable(),
});

export function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function checkCpfExists(cpf) {
    try {
      const response = await fetch("http://localhost:3333/users");
      const users = await response.json();
      return users.some(user => user.cpf === cpf);
    } catch (error) {
      console.error("Erro ao verificar CPF:", error);
      alert("Ocorreu um erro ao verificar o CPF.");
      return false;
    }
  }

  async function onSubmit(data) {
    try {
      const cpfExists = await checkCpfExists(data.cpf);
      if (cpfExists) {
        setError("cpf", {
          type: "manual",
          message: "CPF já está registrado.",
        });
        return;
      }

      const isSuccess = await signUp(data);
      if (isSuccess) {
        navigate("/dashboard");
      } else {
        alert("Cadastro falhou. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Ocorreu um erro ao tentar cadastrar o usuário.");
    }
  }

  return (
    <div className="container-sign-up">
      <div className="content-sign-up">
        <h1 className="h1-sign-up">Cadastre-se</h1>
        <form className="form-sign-up" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <Input
                label="Nome"
                className="div1 input-container content-input"
                placeholder="Nome"
                {...field}
              />
            )}
          />
          {errors.nome && (
            <p className="error-message">{errors.nome.message}</p>
          )}

          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <Input
                label="CPF"
                className="div2 input-container"
                placeholder="CPF"
                {...field}
              />
            )}
          />
          {errors.cpf && <p className="error-message">{errors.cpf.message}</p>}

          <Controller
            name="data_nascimento"
            control={control}
            render={({ field }) => (
              <Input
                label="Data de Nascimento"
                className="div3 input-container"
                placeholder="Data de Nascimento"
                type="date"
                {...field}
              />
            )}
          />
          {errors.data_nascimento && (
            <p className="error-message">{errors.data_nascimento.message}</p>
          )}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Email"
                className="div4 input-container"
                placeholder="Email"
                type="email"
                {...field}
              />
            )}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <Controller
            name="senha"
            control={control}
            render={({ field }) => (
              <Input
                label="Senha"
                className="div5 input-container"
                placeholder="Senha"
                type="password"
                {...field}
              />
            )}
          />
          {errors.senha && (
            <p className="error-message">{errors.senha.message}</p>
          )}

          <div className="btn-sign-up">
            <Button type="submit">Cadastrar</Button>
            <Link to="/">
              <Button variant="secondary">Voltar ao Login</Button>
            </Link>
          </div>
        </form>
      </div>
      <div className="hero-sign-up">
        <Logotipo />
      </div>
    </div>
  );
}
