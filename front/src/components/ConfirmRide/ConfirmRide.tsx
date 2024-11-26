import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRide: React.FC = () => {
  const { state } = useLocation();
  const { rideData, customerId, origin, destination } = state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirmRide = async (driver: any) => {
    setLoading(true);
    try {
      const payload = {
        customer_id: customerId,
        origin,
        destination,
        distance: rideData.distance,
        duration: rideData.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: driver.value,
      };

      await axios.patch("http://localhost:8080/ride/confirm", payload);

      alert("Viagem confirmada com sucesso!");
      navigate("/ride-history", {
        state: { customer_id: customerId },
      });
    } catch (error: any) {
      alert(
        error.response?.data?.error_description || "Erro ao confirmar a viagem."
      );
    } finally {
      setLoading(false);
    }
  };

  const generateMapUrl = () => {
    const { startLocation, endLocation } = rideData.routeResponse;
    const apiKey = "AIzaSyAMBDwX4R0VnSELwWAGbliA05MtpURREn0";
    return `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap
&markers=color:red|label:A|${startLocation.latLng.latitude},${startLocation.latLng.longitude}
&markers=color:blue|label:B|${endLocation.latLng.latitude},${endLocation.latLng.longitude}
&path=color:0x0000ff|weight:5|${startLocation.latLng.latitude},${startLocation.latLng.longitude}
|${endLocation.latLng.latitude},${endLocation.latLng.longitude}
&key=${apiKey}`;
  };

  return (
    <div>
      <h1>Confirmar Viagem</h1>
      <div>
        <h2>Mapa da Rota</h2>
        <img src={generateMapUrl()} alt="Mapa da rota" />
      </div>
      <div>
        <h2>Opções de Motoristas</h2>
        {rideData.options.map((option: any) => (
          <div
            key={option.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{option.name}</h3>
            <p>{option.description}</p>
            <p>
              <strong>Veículo:</strong> {option.vehicle}
            </p>
            <p>
              <strong>Avaliação:</strong> {option.review.rating} estrelas
            </p>
            <p>
              <strong>Comentário:</strong> {option.review.comment}
            </p>
            <p>
              <strong>Valor:</strong> R$ {(option.value / 100).toFixed(2)}
            </p>
            <button
              onClick={() => handleConfirmRide(option)}
              disabled={loading}
            >
              Escolher
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmRide;
