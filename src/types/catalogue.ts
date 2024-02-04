export type StellarLocation = 'planet' | 'moon' | 'space station';
export type MTSubtype = 'Rifle' | 'SMG' | 'Pistol' | '';
export type MTType = 'Experimental' | 'Standard' | 'Alien' | 'Royal' | 'Starter Pistol' | 'Atlantid' | 'Sentinel';
export type ShipType =
  | 'Fighter'
  | 'Explorer'
  | 'Hauler'
  | 'Shuttle'
  | 'Solar'
  | 'Exotic'
  | 'Interceptor'
  | 'Living Ship';
export type Tiers = 'C' | 'B' | 'A' | 'S';
export interface FormItem<T> {
  isActive: boolean;
  isValid?: boolean;
  value: T;
}
