import { uniqueNamesGenerator, Config } from "unique-names-generator";
const animeFirstNames = [
  "Haruto",
  "Ren",
  "Itsuki",
  "Takumi",
  "Souta",
  "Yuki",
  "Akira",
  "Hinata",
  "Riku",
  "Kaito",
  "Sakura",
  "Aoi",
  "Hikari",
  "Mio",
  "Ayaka",
];

const animeLastNames = [
  "Takahashi",
  "Kobayashi",
  "Fujimoto",
  "Yamamoto",
  "Nakamura",
  "Saito",
  "Ishikawa",
  "Matsuda",
  "Shimizu",
  "Hoshino",
];

export function generateAnimeCharacterName() {
  const config: Config = {
    dictionaries: [animeFirstNames, animeLastNames],
    separator: " ",
    style: "capital",
  };

  return uniqueNamesGenerator(config);
}
