import { useAuth } from "../../context/auth";
import "../../styles/profile.css"; // Você pode criar esse CSS também se quiser
import { Logotipo } from "../../components/atoms/logotipo/index.jsx";

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div>Carregando perfil...</div>; // ou redirecionar para login
  }

  return (
    <div className="container-profile">
      <div className="hero-profile">
        <div className="logotipo-profile">
          <Logotipo />
        </div>
        <h1 className="title-profile">Meu Perfil</h1>
      </div>

      <div className="info-profile">
        <p><strong>Nome:</strong> {user.name || "Nome não disponível"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Data de Nascimento:</strong> {user.birthDate || "Não informado"}</p>
        <p><strong>Sexo:</strong> {user.gender || "Não informado"}</p>
        <p><strong>Role ID:</strong> {user.roleId}</p>
      </div>
    </div>
  );
}
