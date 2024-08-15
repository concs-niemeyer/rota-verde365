// Componente Dashboard.jsx
import { useState, useEffect } from "react";
import Card from "../../components/atoms/card";
import UsersRound from "../../components/icons/users-round";
import MapPinned from "../../components/icons/map-pinned";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "../../components/molecules/table";
import "../../styles/dashboard.css";
import Mapa from "../../components/atoms/mapMyLocation";

export function Dashboard() {
  const [locais, setLocais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState("");

  // Função para buscar locais
  async function buscarLocais() {
    try {
      const response = await fetch("http://localhost:3333/locais"); // URL da API para buscar os locais
      if (response.ok) {
        const data = await response.json();
        setLocais(data);
        // Verifique se há locais
        if (data.length > 0) {
          // Gere um índice aleatório
          const indiceAleatorio = Math.floor(Math.random() * data.length);

          // Pegue o local aleatório usando o índice
          const localAleatorio = data[indiceAleatorio];

          // Atualize as coordenadas e o nome do local
          setLatitude(localAleatorio.localizacao.latitude);
          setLongitude(localAleatorio.localizacao.longitude);
          setLocationName(localAleatorio.nome);
        }
      } else {
        console.error("Erro ao buscar locais");
      }
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    }
  }

  // Função para buscar usuários
  async function buscarUsuarios() {
    try {
      const response = await fetch("http://localhost:3333/users"); // URL da API para buscar os usuários
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error("Erro ao buscar usuários");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  useEffect(() => {
    buscarLocais();
    buscarUsuarios();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="card-dashboard">
        <Card
          title="Usuários"
          total={usuarios.length}
          iconElement={UsersRound}
        />
        <Card title="Locais" total={locais.length} iconElement={MapPinned} />
      </div>

      {latitude && longitude && (
        <div className="mapa-dashboard">
          <Mapa
            latitude={latitude}
            longitude={longitude}
            locationName={locationName}
          />
        </div>
      )}

      <div className="table-container">
        <header className="headerContainer">
          <div>
            <h2>Locais</h2>
            <p>Lista dos locais cadastrados</p>
          </div>
        </header>

        <div className="container-local">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Local</TableHead>
                <TableHead>Usuário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locais.map((local) => (
                <TableRow key={local.id}>
                  <TableCell>{local.nome}</TableCell>
                  <TableCell>{local.identificador_do_usuario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
