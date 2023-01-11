export interface IBuilding {
  readonly idBuilding: number;

  readonly adress: string;
  readonly postalCode: string;
  readonly city: string;
  readonly latitude: number;
  readonly longitude: number;

  readonly availablePlace: number;
}
