export type User = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  location: Coordinates;
  distance: number | null;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
