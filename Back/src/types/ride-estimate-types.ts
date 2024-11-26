type FormattedDriver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
};

type ResEstimate = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: Array<FormattedDriver>;
  routeResponse: object;
};
type ReqEstimate = {
  customer_id: string;
  origin: string;
  destination: string;
};
export { FormattedDriver, ReqEstimate, ResEstimate };
