import { Manufacturer } from "./Manufacturer";

export interface ManufacturerWithHedera extends Manufacturer {
    hederaAccount: string;
    hederaRole: string;
    hederaName: string;
  }
  