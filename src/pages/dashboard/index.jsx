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
import { api } from "../../utils/api";

export function Dashboard() {
  const [locals, setLocals] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [locationName, setLocationName] = useState("");

  // Função para buscar locais
  async function buscarLocais() {
    try {
      const response = await api("/locals");
      const data = await response.json();
      console.log(data.locals, "<<DATA.LOCAIS_DASHBOARD>>");
      setLocals(data.locals); // Corrigido para salvar todos os locais

      if (data.locals.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * data.locals.length);
        const localAleatorio = data.locals[indiceAleatorio];
        console.log(localAleatorio, "<<LOCAL_ALEATÓRIO>>");

        setLat(localAleatorio.lat);
        setLon(localAleatorio.lon);
        setLocationName(localAleatorio.name);
      }
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    }
  }

  // Função para buscar usuários
  async function buscarUsuarios() {
    try {
      const response = await api("/users");
      console.log(response, ":::RESPOSTA_USERS:::");
      if (response.ok) {
        const data = await response.json();
        console.log(data.total, "<<GET_USERS>>");
        setUsuarios(data.total);
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
          total={usuarios}
          iconElement={UsersRound}
        />
        <Card title="Locais" total={locals.length} iconElement={MapPinned} />
      </div>

      {lat && lon && (
        <div className="mapa-dashboard">
          <Mapa lat={lat} lon={lon} locationName={locationName} />
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
                <TableHead>Endereço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locals.map((local) => (
                <TableRow key={local.id}>
                  <TableCell>{local.name}</TableCell>
                  <TableCell>{local.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
