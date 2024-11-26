import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
interface Driver {
  id: number;
  name: string;
}
interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

interface RideHistoryData {
  rides: {
    customer_id: string;
    rides: Ride[];
  };
}

const RideHistory: React.FC = () => {
  const { state } = useLocation();
  const { customer_id } = state;
  console.log("SSSS", customer_id);
  const [customerId, setCustomerId] = useState<string>(customer_id);
  console.log("DDDDD", customerId);
  const [driverId, setDriverId] = useState<number | string>("all");
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);

  const [drivers, setDrivers] = useState<Driver[]>([]);

  const extractDriversFromRides = (rides: Ride[]) => {
    const uniqueDrivers: number[] = [];
    const driversList: Driver[] = [];

    rides.forEach((ride) => {
      if (!uniqueDrivers.includes(ride.driver.id)) {
        uniqueDrivers.push(ride.driver.id);
        driversList.push(ride.driver);
      }
    });
    setDrivers(driversList);
  };
  const filterRides = () => {
    if (driverId == "all") {
      setFilteredRides(rides);
      return;
    }
    const filtered = rides.filter((ride) => ride.driver.id == driverId);
    setFilteredRides(filtered);
  };
  useEffect(() => {
    filterRides();
  }, [driverId, rides]);

  const fetchRides = async () => {
    if (!customerId) return;

    try {
      const response = await axios.get<RideHistoryData>(
        `http://localhost:8080/ride/${customerId}`,
        {
          params: {
            driver_id: driverId === "all" ? "" : driverId,
          },
        }
      );
      setRides(response.data.rides.rides);
      extractDriversFromRides(response.data.rides.rides);
      console.log("bbbb", response.data.rides.rides);
      console.log("ccccc", rides);
      setDriverId("all");
      console.log("dddddddddd", filteredRides);
    } catch (error: any) {
      console.error("Erro ao buscar histórico de viagens:", error);
      alert("Erro ao buscar histórico de viagens.");
    }
  };

  const handleFilter = () => {
    console.log("aaaaaaa", customerId);
    fetchRides();
  };

  useEffect(() => {
    if (customerId) {
      fetchRides();
    }
  }, []);

  return (
    <div>
      <h1>Histórico de Viagens</h1>
      <div>
        <input
          type="text"
          placeholder="ID do Usuário"
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value);
            console.log(customerId);
          }}
        />
        <select
          value={driverId}
          onChange={(e) => {
            setDriverId(e.target.value);
          }}
        >
          <option value="all">Mostrar Todos os Motoristas</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        <button onClick={handleFilter}>Aplicar Filtro</button>
      </div>

      <div>
        {filteredRides.length > 0 ? (
          <ul>
            {filteredRides.map((ride) => (
              <li key={ride.id}>
                <div>
                  <strong>Data e Hora:</strong>{" "}
                  {new Date(ride.date).toLocaleString()}
                </div>
                <div>
                  <strong>Motorista:</strong> {ride.driver.name}
                </div>
                <div>
                  <strong>Origem:</strong> {ride.origin}
                </div>
                <div>
                  <strong>Destino:</strong> {ride.destination}
                </div>
                <div>
                  <strong>Distância:</strong> {ride.distance} metros
                </div>
                <div>
                  <strong>Tempo:</strong> {ride.duration}
                </div>
                <div>
                  <strong>Valor:</strong> R${ride.value.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma viagem encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default RideHistory;
