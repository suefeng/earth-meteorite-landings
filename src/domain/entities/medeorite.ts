export interface MedeoriteType {
  id: number;
  name: string;
  nametype: string;
  recclass: string;
  mass?: number;
  fall: string;
  year?: number;
  reclat: number;
  reclong: number;
  geolocation: {type: string, coordinates: [number, number]};
};

export interface MedeoriteFormattedType {
  id: number;
  name: string;
  nametype: string;
  recclass: string;
  mass?: number;
  fall: string;
  year?: number;
  reclat: number;
  reclong: number;
  geolocation: string;
};