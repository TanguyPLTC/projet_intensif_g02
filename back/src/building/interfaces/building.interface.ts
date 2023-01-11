export interface IBuilding {
  readonly idBuilding: number;

  readonly adress: string;
  readonly postalCode: string;
  readonly city: string;
  readonly latitude: string;
  readonly longitude: string;

  readonly availablePlace: number;
}
