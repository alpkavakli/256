// Disclaimer:
// Database may contain incorrect data.

// Structure
// countries = [{ code, name, area, population, capital }]
// cities = { ID: { code, name, population } }

// code, name, area, population, capital
export const countries = [
  {
    code: 'FIN',
    name: 'Finland',
    area: 338145.00,
    population: 5171300,
    capital: '3236'
  },
  {
    code: 'LBN',
    name: 'Lebanon',
    area: 10400.00,
    population: 3282000,
    capital: '2438'
  },
  {
    code: 'KOR',
    name: 'South Korea',
    area: 99434.00,
    population: 46844000,
    capital: '2331'
  }
];

// ID => { code, name, population }
export const cities = {
  '3237': { code: 'FIN', name: 'Espoo', population: 213271 },
  '3236': { code: 'FIN', name: 'Helsinki [Helsingfors]', population: 555474 },
  '3242': { code: 'FIN', name: 'Lahti', population: 96921 },
  '3241': { code: 'FIN', name: 'Oulu', population: 120753 },
  '3238': { code: 'FIN', name: 'Tampere', population: 195468 },
  '3240': { code: 'FIN', name: 'Turku [Åbo]', population: 172561 },
  '3239': { code: 'FIN', name: 'Vantaa', population: 178471 },
  '2438': { code: 'LBN', name: 'Beirut', population: 1100000 },
  '2439': { code: 'LBN', name: 'Tripoli', population: 240000 },
  '2332': { code: 'KOR', name: 'Pusan', population: 3804522 },
  '2353': { code: 'KOR', name: 'Pyongtaek', population: 312927 },
  '2395': { code: 'KOR', name: 'Sachon', population: 113494 },
  '2388': { code: 'KOR', name: 'Sangju', population: 124116 },
  '2331': { code: 'KOR', name: 'Seoul', population: 9981619 },
  '2383': { code: 'KOR', name: 'Shihung', population: 133443 },
  '2338': { code: 'KOR', name: 'Songnam', population: 869094 }
};