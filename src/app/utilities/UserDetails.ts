export interface UserDetails {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  city: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
}
