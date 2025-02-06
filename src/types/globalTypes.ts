export interface ICountries {
  code: string,
  name: string,
  population: number,
  area: number,
}

export interface ICurrUser {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
}

interface ICurrUserObj {
  currUser: ICurrUser;
}

export interface RootStateCustom {
  countries: string[];
  favCountries: string[];
  currUser: ICurrUserObj;
  openInfoBar: boolean;
  allUsersCountries: any;
}
