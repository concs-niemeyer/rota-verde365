import { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "../../components/molecules/table";
import Button from "../../components/atoms/button";
import "../../styles/locals.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export function Locais() {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] =useState(false)
  const navigate = useNavigate();

  // Função para buscar locais deve realizar o fetch das duas tabelas Locais e Descrições
  async function buscarLocais() {
    try {
      setLoading(true); // <<< Começa o carregamento
      const response = await fetch("../../server.json");
      const data = await response.json();
      
      const locaisComDescricao = data.locals.map((local) => {
        const descricao = data.descriptions.find((desc) => desc.local_id === local.id) || {};
  
        return {
          id: local.id,
          name: local.name,
          userId: descricao.userId || "",
          address: local.address,
          desc_fauna: descricao.desc_fauna || "",
          desc_flora: descricao.desc_flora || "",
          data_visita: descricao.data_visita || "",
        };
      });
  
      setLocais(locaisComDescricao);
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    } finally {
      setLoading(false); // <<< Quando terminar (com sucesso ou erro), para de carregar
    }
  }
  
  function formatarData(dataISO) {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }
  

  useEffect(() => {
    buscarLocais();
  }, []);

  return (
    <div>
      <header className="headerContainer">
        <div>
          <h1>Locais</h1>
          <span>Localidades cadastradas</span>
        </div>
        <div className="locals-cadastrar">
          <Button onClick={() => navigate("/dashboard/locals/cadastrar")}>
            Cadastrar local
          </Button>
        </div>
      </header>

      <div className="container-local">
  {loading ? (
    <p>Carregando locais...</p> // <<< aqui mostra enquanto busca
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Local</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Descrição da Fauna</TableHead>
          <TableHead>Descrição da Flora</TableHead>
          <TableHead>Data da Visita</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locais.map((local) => (
          <TableRow key={local.id}>
            <TableCell>{local.name}</TableCell>
            <TableCell>{local.userId}</TableCell>
            <TableCell>{local.address}</TableCell>
            <TableCell>{local.desc_fauna}</TableCell>
            <TableCell>{local.desc_flora}</TableCell>
            <TableCell>{formatarData(local.data_visita)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</div>

    </div>
  );
}
