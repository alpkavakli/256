export const names = [
  "Ali",
  "Ayşe",
  "Mehmet",
  "Fatma",
  "Ahmet",
  "Zeynep",
  "Seçkin",
  "Özge",
  "Emre",
  "Elif",
  "Ecem",
  "Deniz",
  "Murat"
];

export const lastnames = [
  "Yılmaz",
  "Kaya",
    "Demir",
    "Çelik",
    "Şahin",
    "Gül",
    "Ongun",
    "Can",
    "Aydın",
    "Öztürk",
    "Arslan",
    "Polat",
    "Kılıç"
];

export const getRandomStudent = () => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomLastname = lastnames[Math.floor(Math.random() * lastnames.length)];
  const year = Math.floor(Math.random() * (2006-1999 +1)) + 1999; 
  const bday = `${year}-01-01`
  const cgpa = (Math.floor(Math.random() * 201) + 200) / 100; 
  return {
    name: randomName,
    lastname: randomLastname,
    bday: bday,
    cgpa: cgpa
  };
} 