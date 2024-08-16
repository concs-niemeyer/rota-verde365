import { Navigate, NavLink, Outlet } from "react-router-dom";
import { Home, MapPinned, LogOut } from "lucide-react";
import { useAuth } from "../../context/auth"; // Ajuste o caminho conforme necessário
import "../../styles/dashboard.css";
import { Logotipo } from "../../components/atoms/logotipo/index.jsx";

export function PrivateRouteLayout() {
  const { user, signOut } = useAuth(); // Assumindo que signOut é a função para logout

  return user ? (
    <div className="container-dashboard">
      <aside className="aside">
        <div className="logotipo-aside">
          <Logotipo></Logotipo>
        </div>
        <nav className="nav-aside">
          <ul className="ul-aside-dashboard">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Home size={24} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/locals"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <MapPinned size={24} /> Locais
              </NavLink>
            </li>
          </ul>
		  <div className="navBottom">
          <button onClick={signOut}>
            <LogOut size={24} /> Sair
          </button>
        </div>
        </nav>
      </aside>
      <main className="content-dashboard">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
