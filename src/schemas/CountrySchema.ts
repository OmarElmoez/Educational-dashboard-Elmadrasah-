import { z } from 'zod';

const CountrySchema = z.object({
  name: z.object({
    common: z.string()
  }).describe('English Name'),
  region: z.string(),
  cca2: z.string(),
  translations: z.object({
    ara: z.object({
      common: z.string()
    }).describe('Arabic Translation')
  }).describe('Translations'),
  timezones: z.array(z.string())
}).describe('Country');

export type TCountry = z.infer<typeof CountrySchema>;

export default CountrySchema;
