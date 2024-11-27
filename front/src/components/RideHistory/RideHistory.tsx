import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./RideHistory.module.css"; // Importação como módulo CSS

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
  const [customerId, setCustomerId] = useState<string>(customer_id);
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
      setDriverId("all");
    } catch (error: any) {
      console.error("Erro ao buscar histórico de viagens:", error);
      alert("Erro ao buscar histórico de viagens.");
    }
  };

  const handleFilter = () => {
    fetchRides();
  };

  useEffect(() => {
    if (customerId) {
      fetchRides();
    }
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.header}>Histórico de Viagens</h1>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="ID do Usuário"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className={styles.input}
          />
          <select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className={styles.select}
          >
            <option value="all">Mostrar Todos os Motoristas</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
          <button onClick={handleFilter} className={styles.button}>
            Aplicar Filtro
          </button>
        </div>

        <div>
          {filteredRides.length > 0 ? (
            <ul className={styles.rideList}>
              {filteredRides.map((ride) => (
                <li key={ride.id} className={styles.rideItem}>
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
                    <strong>Valor:</strong> R${(ride.value/100).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>Nenhuma viagem encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideHistory;
