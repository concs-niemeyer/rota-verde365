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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // Função para buscar locais deve realizar o fetch das duas tabelas Locais e Descrições
  async function buscarLocaisComDescricao() {
    try {
      setLoading(true);
      
      const localResponse = await api("/locals");
      const localData = await localResponse.json();
      console.log(localData, ":::LOCAL_DATA:::");
  
      const locaisComDescricao = localData.locais.map((local) => {
        const descricao = localData.descriptionLocal || {}; // Já está no localData
  
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
      setLoading(false);
    }
  }
  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  useEffect(() => {
    buscarLocaisComDescricao();
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
