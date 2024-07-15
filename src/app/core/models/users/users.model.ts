export interface userInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: address[];
  phone: string;
  website: string;
  company: company[];
}

export interface company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface address {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: geo;
}

interface geo {
  lat: string;
  lng: string;
}