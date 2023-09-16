import type { StellarLocation, ShipType, Tiers } from "../types/catalogue";

export function albumEntry(file: string, name: string, other: string = '', glyphs: string, discoverer: string, additionalInfo: string = '') {  // NoSonar this is fine
  return `| {{album | file=${file} | name=${name} | other=${other} | glyph=${glyphs} | ${discoverer} }} ${additionalInfo}`;
}

export function discovererParm(discovererReddit: string, discoverer: string) {
  if (discovererReddit && discoverer && discovererReddit !== discoverer) return `redditA=${discovererReddit} | redditD=${discoverer}`;
  if (discovererReddit) return `reddit=${discovererReddit}`;
  return `discoverer=${discoverer}`;
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

  if (srLocType === 'space station' && mtLocType === 'space station') return station;
  if (srLocType === 'space station') return stationToPlanet;
  if (mtLocType === 'space station') return planetToStation;
  if (srLocName === mtLocName && srLocType === mtLocType) return samePlanet;
  return planetToPlanet;
}

export const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function starshipOther(type: ShipType, coordinates: string, locName: string, economy: string, isCrashed: boolean, tier: Tiers) {
  const hasCoords = `<br>[[${locName}]] (${coordinates})`
  const hasEconomy = `<br>${economy}`;
  const hasEconomyAndCoords = hasEconomy + hasCoords;
  const crashed = `{{class|${tier}}}${hasEconomyAndCoords}`;

  if (type === 'Living Ship') return hasCoords;
  if (type === 'Interceptor') return hasEconomyAndCoords;
  if (isCrashed) return crashed;
  return hasEconomy;
}

export const checkNumberString = (num: string) => !isNaN(parseFloat(num)) || !num;