import axios, { AxiosResponse } from "axios";

interface NominatimResult {
  place_id: number;
  licence: string;
  lat: number;
  lon: number;
  display_name: string;
  address: {
    road: string;
    locality: string;
    city: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
}

export const reverseGeocoding = async (latitude: number, longitude: number) => {
  const result: AxiosResponse<NominatimResult> = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  const data = { ...result.data };
  data.display_name =
    data.display_name || data.address.city || data.address.country;
  delete data.lat;
  delete data.lon;
  delete data.licence;
  return data;
};
