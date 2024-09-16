import { TCity } from "@/schemas/CitySchema";

const formatCities = (cities: TCity[], chosenState: string) => {
  return cities
    .filter((city) =>
      chosenState.toLowerCase().includes(city.adminName1.toLowerCase())
    )
    .map((city) => ({
      value: city.name,
      label: city.name,
    }));
}

export default formatCities;