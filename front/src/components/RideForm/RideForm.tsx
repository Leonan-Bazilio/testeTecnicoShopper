import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RideForm: React.FC = () => {
  const [customerId, setCustomerId] = useState("");

  const [originStreet, setOriginStreet] = useState("");
  const [originNumber, setOriginNumber] = useState("");
  const [originNeighborhood, setOriginNeighborhood] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [originState, setOriginState] = useState("");
  const [originPostalCode, setOriginPostalCode] = useState("");
  const [originCountry, setOriginCountry] = useState("");

  const [destinationStreet, setDestinationStreet] = useState("");
  const [destinationNumber, setDestinationNumber] = useState("");
  const [destinationNeighborhood, setDestinationNeighborhood] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationState, setDestinationState] = useState("");
  const [destinationPostalCode, setDestinationPostalCode] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");

  const navigate = useNavigate();

  const formatAddress = (
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  ) => {
    const addressParts = [
      street,
      number,
      neighborhood,
      city,
      state,
      postalCode,
      country,
    ].filter(Boolean); 
    return addressParts.join(", ");
  };

  const handleEstimate = async () => {
    try {
     
      const origin = formatAddress(
        originStreet,
        originNumber,
        originNeighborhood,
        originCity,
        originState,
        originPostalCode,
        originCountry
      );

      const destination = formatAddress(
        destinationStreet,
        destinationNumber,
        destinationNeighborhood,
        destinationCity,
        destinationState,
        destinationPostalCode,
        destinationCountry
      );

      const response = await axios.post("http://localhost:8080/ride/estimate", {
        customer_id: customerId,
        origin,
        destination,
      });

      navigate("/confirm-ride", {
        state: { rideData: response.data, customerId, origin, destination },
      });
    } catch (error: any) {
      alert(
        error.response?.data?.error_description || "Erro ao estimar viagem."
      );
    }
  };

  return (
    <div>
      <h1>Solicitar Viagem</h1>

      <input
        placeholder="ID do Usuário"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />

      <h2>Origem</h2>
      <input
        placeholder="Rua"
        value={originStreet}
        onChange={(e) => setOriginStreet(e.target.value)}
      />
      <input
        placeholder="Número"
        value={originNumber}
        onChange={(e) => setOriginNumber(e.target.value)}
      />
      <input
        placeholder="Bairro"
        value={originNeighborhood}
        onChange={(e) => setOriginNeighborhood(e.target.value)}
      />
      <input
        placeholder="Cidade"
        value={originCity}
        onChange={(e) => setOriginCity(e.target.value)}
      />
      <input
        placeholder="Estado"
        value={originState}
        onChange={(e) => setOriginState(e.target.value)}
      />
      <input
        placeholder="CEP"
        value={originPostalCode}
        onChange={(e) => setOriginPostalCode(e.target.value)}
      />
      <input
        placeholder="País"
        value={originCountry}
        onChange={(e) => setOriginCountry(e.target.value)}
      />

      <h2>Destino</h2>
      <input
        placeholder="Rua"
        value={destinationStreet}
        onChange={(e) => setDestinationStreet(e.target.value)}
      />
      <input
        placeholder="Número"
        value={destinationNumber}
        onChange={(e) => setDestinationNumber(e.target.value)}
      />
      <input
        placeholder="Bairro"
        value={destinationNeighborhood}
        onChange={(e) => setDestinationNeighborhood(e.target.value)}
      />
      <input
        placeholder="Cidade"
        value={destinationCity}
        onChange={(e) => setDestinationCity(e.target.value)}
      />
      <input
        placeholder="Estado"
        value={destinationState}
        onChange={(e) => setDestinationState(e.target.value)}
      />
      <input
        placeholder="CEP"
        value={destinationPostalCode}
        onChange={(e) => setDestinationPostalCode(e.target.value)}
      />
      <input
        placeholder="País"
        value={destinationCountry}
        onChange={(e) => setDestinationCountry(e.target.value)}
      />

      <button onClick={handleEstimate}>Estimar Viagem</button>
    </div>
  );
};

export default RideForm;
