import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button";
import Input from "../../components/atoms/input";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Mapa from "../../components/atoms/mapMyLocation";
import "../../styles/CadastrarLocal.css";

// Lista de UFs do Brasil
const ufs = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' },
];

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  descricao: yup.string().required("Descrição é obrigatória"),
  cep: yup.string().matches(/^\d{5}-?\d{3}$/, "CEP inválido. Ex: 12345-678"),
  endereco: yup.string(),
  numero: yup.string(),
  estado: yup.string().required("UF é obrigatória"),
  complemento: yup.string(),
});

export function CadastrarLocal() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationName, setLocationName] = useState("");
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function buscarCoordenadas(nome) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${nome}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));
        setLocationName(nome);
      } else {
        alert("Local não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
      alert("Ocorreu um erro ao buscar coordenadas.");
    }
  }
  async function onSubmit(data) {
	try {
	  // Obtendo os valores das coordenadas
	  if (data.nome) {
		await buscarCoordenadas(data.nome);
	  }
  
	  // Estruturando o objeto no formato esperado
	  const localData = {
		nome: data.nome,
		identificador_do_usuario: "USR008", // Definir como obter o identificador do usuário, se aplicável
		descricao: data.descricao,
		localizacao: {
		  cep: data.cep,
		  logadouro: data.endereco,
		  bairro: data.bairro, // Certifique-se de adicionar este campo ao seu formulário, se necessário
		  cidade: data.cidade,
		  estado: data.estado, // 'estado' === UF
		  latitude,
		  longitude,
		},
		id: data.id || "", 
	  };
  
	  const response = await fetch("http://localhost:3333/locais", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(localData),
	  });
  
	  if (response.ok) {
		alert("Local cadastrado com sucesso!");
		navigate("/dashboard/locals");
	  } else {
		alert("Falha ao cadastrar local. Verifique os dados e tente novamente.");
	  }
	} catch (error) {
	  console.error("Erro ao cadastrar local:", error);
	  alert("Ocorreu um erro ao tentar cadastrar o local.");
	}
  }
  
  return (
    <div className="container-cadastar-local">
      <h1 className="h1-cadastrar-local">Cadastrar Local</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-cadastrar-local">
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <Input
                label="Nome do Local"
                className="input-container"
                placeholder="Nome do Local"
                {...field}
              />
            )}
          />
          {errors.nome && <p className="error-message">{errors.nome.message}</p>}

          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <Input label="Descrição" placeholder="Descrição" {...field} />
            )}
          />
          {errors.descricao && <p className="error-message">{errors.descricao.message}</p>}

          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <Input
                label="CEP"
                className="input-container"
                placeholder="CEP"
                {...field}
              />
            )}
          />
          {errors.cep && <p className="error-message">{errors.cep.message}</p>}

          <Controller
            name="endereco"
            control={control}
            render={({ field }) => (
              <Input
                label="Endereço"
                className="input-container"
                placeholder="Endereço"
                {...field}
              />
            )}
          />
          <Controller
            name="numero"
            control={control}
            render={({ field }) => (
              <Input
                label="Número"
                className="input-container"
                placeholder="Número"
                {...field}
              />
            )}
          />
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <div className="input-container">
                <label htmlFor="estado">UF</label>
                <select id="estado" {...field} className="input-select">
                  <option value="">Selecione um estado</option>
                  {ufs.map((uf) => (
                    <option key={uf.sigla} value={uf.sigla}>
                      {uf.sigla} - {uf.nome}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
          {errors.estado && <p className="error-message">{errors.estado.message}</p>}

          <Controller
            name="complemento"
            control={control}
            render={({ field }) => (
              <Input
                label="Complemento"
                className="input-container"
                placeholder="(opcional)"
                {...field}
              />
            )}
          />

          <div className="btn-cadastrar-local">
            <Button
              type="button"
              onClick={() => {
                const nomeLocal = getValues("nome");
                if (nomeLocal) {
                  buscarCoordenadas(nomeLocal);
                } else {
                  alert("Por favor, insira o nome do local antes de buscar.");
                }
              }}
            >
              Buscar Local
            </Button>

            <Button type="submit">Cadastrar</Button>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>Voltar</Button>
          </div>
        </div>
      </form>
      <div className="mapa-cadastrar-local">
        <span>Mapa</span>
        <Mapa
          latitude={latitude}
          longitude={longitude}
          locationName={locationName}
        />
      </div>
    </div>
  );
}
