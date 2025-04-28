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
      const localResponse = await api("/locals");
      const localData = await localResponse.json();
      const descriptionResponse = await api("/descriptions");
      const descriptionData = await descriptionResponse.json();
    
      const locaisComDescricao = localData.locals.map((local) => {
        const descricao = descriptionData.descriptions.find((desc) => desc.localId === local.id) || {};
  
        return {
          id: local.id,
          name: local.name,
          userId: descricao.userId || "",
          address: local.address,
          descFauna: descricao.descFauna || "",
          descFlora: descricao.descFlora || "",
          dataVisita: descricao.dataVisita || "",
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
            <TableCell>{local.descFauna}</TableCell>
            <TableCell>{local.descFlora}</TableCell>
            <TableCell>{formatarData(local.dataVisita)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</div>

    </div>
  );
}
