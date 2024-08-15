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

export function Locais() {
  const [locais, setLocais] = useState([]);
  const navigate = useNavigate();


  // Função para buscar locais
  async function buscarLocais() {
    try {
      const response = await fetch("http://localhost:3333/locais"); // URL da API para buscar os locais
      if (response.ok) {
        const data = await response.json();
        setLocais(data);
      } else {
        console.error("Erro ao buscar locais");
      }
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    }
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Local</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>UF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locais.map((local) => (
              <TableRow key={local.id}>
                <TableCell>{local.nome}</TableCell>
                <TableCell>{local.descricao}</TableCell>
                <TableCell>{local.identificador_do_usuario}</TableCell>
                <TableCell>{local.localizacao.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
