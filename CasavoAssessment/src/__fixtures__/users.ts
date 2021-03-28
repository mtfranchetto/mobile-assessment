import { User } from '../types';

export const mockUsersList: User[] = [{
  address: 'street number 1',
  id: 1,
  name: 'Johnny',
  phoneNumber: '3882229',
  location: {
    latitude: 1,
    longitude: 1,
  },
  distance: null,
}, {
  address: 'street number 2',
  id: 2,
  name: 'Jenny',
  phoneNumber: '7376293',
  location: {
    longitude: 41,
    latitude: 51,
  },
  distance: null,
}];