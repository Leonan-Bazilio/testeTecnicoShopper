import RideHistoryDTO from "./ride-history-DTO";

export default interface ResRidesHistoryDTO {
  customer_id: string;
  rides: {
    id: number;
    date: Date;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[];
}
