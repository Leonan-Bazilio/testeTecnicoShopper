export default interface DriverDTO {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: string;
    comment: string;
  };
  ratePerKmInCent: number;
  minDistanceInKm: number;
}
