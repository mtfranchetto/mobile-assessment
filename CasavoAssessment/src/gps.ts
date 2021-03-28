import { createAsyncThunk } from '@reduxjs/toolkit';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 5.0
});

/**
 * TODO: the gps functionality is better to be wrapped under an interface
 * (similar to the IHTTPClient) so it could be easily substituted/decorated
 * in the future
 */
export const fetchUserPosition = createAsyncThunk(
  'user/position',
  async () => {
    const enabled = await RNLocation.requestPermission({
      ios: 'whenInUse',
    });
    if (enabled) {
      // I'm using the latest location for simplicity even if it will be probably
      // better to poll the location to follow the user movements
      const location = await RNLocation.getLatestLocation({ timeout: 60000 });
      if (location) {
        return {
          latitude: location.latitude, longitude: location.longitude,
        };
      } else {
        throw new Error('Location not available');
      }
    } else {
      throw new Error('Location permissions not granted');
    }
  }
);