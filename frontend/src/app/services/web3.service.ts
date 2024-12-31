import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  private contract: any;
  private readonly rpcURL = 'https://testnet.hashio.io/api';
  private contractAddress: string = '0xD9e7e534bc6C22150286090a1F486B5766a5187A';
  private contractABI: any = [
    {
      "constant": true,
      "inputs": [],
      "name": "getAllManufacturers",
      "outputs": [
        {
          "components": [
            { "name": "name", "type": "string" },
            { "name": "role", "type": "string" },
            { "name": "account", "type": "address" }
          ],
          "name": "",
          "type": "tuple[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

  constructor() {
    this.web3 = new Web3(this.rpcURL);
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    console.log('Web3 initialized successfully:', !!this.web3);
  }

  async getAllManufacturers(): Promise<any[]> {
    try {
      const fabricants = await this.contract.methods.getAllManufacturers().call();
      return fabricants.map((fab: any) => ({
        name: fab.name,
        role: fab.role,
        account: fab.account,
      }));
    } catch (error) {
      console.error('Error fetching fabricants:', error);
      throw error;
    }
  }
}