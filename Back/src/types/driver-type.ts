export type Driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  ratePerKmInCent: number;
  minDistanceInKm: number;
};
