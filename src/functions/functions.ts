import type { StellarLocation } from "../types/catalogue";

export function albumEntry(file: string, name: string, other: string = '', glyphs: string, discoverer: string, additionalInfo: string = '') {  // NoSonar this is fine
  return `| {{album | file=${file} | name=${name} | other=${other} | glyph=${glyphs} | ${discoverer} }} ${additionalInfo}`;
}

export function discovererParm(discovererReddit: string, discoverer: string) {
  if (discovererReddit && discoverer && discovererReddit !== discoverer) {
    return `| redditA=${discovererReddit} | redditD=${discoverer}`;
  } else if (discovererReddit) {
    return `| reddit=${discovererReddit}`;
  } else {
    return `| discoverer=${discoverer}`;
  }
}

export function addInfoMt(coordinates: string, srLocName: string, mtLocName: string, srLocType: StellarLocation, mtLocType: StellarLocation): string {
  const srOnStation = 'S/r on the space station';
  const srOnPlanet = `S/r on ${srLocType} [[${srLocName}]]`;
  const flyToPlanet = `then fly to ${mtLocType} [[${mtLocName}]] (${coordinates})`;

  const station = `${srOnStation}, then take from cabinet.`;
  const stationToPlanet = `${srOnStation}, ${flyToPlanet}.`;
  const planetToStation = `${srOnPlanet}, then fly to the space station.`;
  const planetToPlanet = `${srOnPlanet}, ${flyToPlanet}.`;
  const samePlanet = `${srOnPlanet}, then fly to (${coordinates}).`;

  if (srLocType === 'space station' && mtLocType === 'space station') {
    return station;
  } else if (srLocType === 'space station') {
    return stationToPlanet;
  } else if (mtLocType === 'space station') {
    return planetToStation;
  } else if (srLocName === mtLocName && srLocType === mtLocType) {
    return samePlanet;
  } else {
    return planetToPlanet;
  }
}

export const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
