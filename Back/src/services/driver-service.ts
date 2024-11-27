import DriverModel from "../models/driver"; // Importando o modelo Driver

async function getAllDrivers() {
  try {
    const drivers = await DriverModel.find();
    return drivers;
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    throw error;
  }
}

export { getAllDrivers };
