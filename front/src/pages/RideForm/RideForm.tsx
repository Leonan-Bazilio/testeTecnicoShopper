import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RideForm.module.css";

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

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    setErrorMessage(null);

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
      const errorResponse = error.response?.data;
      const customErrorMessage =
        errorResponse?.error_description || "Erro ao estimar viagem.";
      setErrorMessage(customErrorMessage);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Simulador de viagem</h1>
        <div className={styles.divIdUser}>
          <input
            placeholder="ID do Usuário"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>

        <h2>Origem</h2>
        <div className={styles.inputGroup}>
          <div className={styles.line1}>
            <input
              className={styles.street}
              placeholder="Rua"
              value={originStreet}
              onChange={(e) => setOriginStreet(e.target.value)}
            />
            <input
              className={styles.number}
              placeholder="Número"
              value={originNumber}
              onChange={(e) => setOriginNumber(e.target.value)}
            />
            <input
              className={styles.neighborhood}
              placeholder="Bairro"
              value={originNeighborhood}
              onChange={(e) => setOriginNeighborhood(e.target.value)}
            />
          </div>
          <div className={styles.line2}>
            <input
              className={styles.city}
              placeholder="Cidade"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
            />
            <input
              className={styles.state}
              placeholder="Estado"
              value={originState}
              onChange={(e) => setOriginState(e.target.value)}
            />
            <input
              className={styles.postalCode}
              placeholder="CEP"
              value={originPostalCode}
              onChange={(e) => setOriginPostalCode(e.target.value)}
            />
            <input
              className={styles.country}
              placeholder="País"
              value={originCountry}
              onChange={(e) => setOriginCountry(e.target.value)}
            />
          </div>
        </div>

        <h2>Destino</h2>
        <div className={styles.inputGroup}>
          <div className={styles.line1}>
            <input
              className={styles.street}
              placeholder="Rua"
              value={destinationStreet}
              onChange={(e) => setDestinationStreet(e.target.value)}
            />
            <input
              className={styles.number}
              placeholder="Número"
              value={destinationNumber}
              onChange={(e) => setDestinationNumber(e.target.value)}
            />
            <input
              className={styles.neighborhood}
              placeholder="Bairro"
              value={destinationNeighborhood}
              onChange={(e) => setDestinationNeighborhood(e.target.value)}
            />
          </div>
          <div className={styles.line2}>
            <input
              className={styles.city}
              placeholder="Cidade"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
            />
            <input
              className={styles.state}
              placeholder="Estado"
              value={destinationState}
              onChange={(e) => setDestinationState(e.target.value)}
            />
            <input
              className={styles.postalCode}
              placeholder="CEP"
              value={destinationPostalCode}
              onChange={(e) => setDestinationPostalCode(e.target.value)}
            />
            <input
              className={styles.country}
              placeholder="País"
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
            />
          </div>
        </div>

        {errorMessage && (
          <div className={styles.errorMessage}>
            <p>{errorMessage}</p>
          </div>
        )}

        <button onClick={handleEstimate}>Estimar Viagem</button>
      </div>
    </div>
  );
};

export default RideForm;
