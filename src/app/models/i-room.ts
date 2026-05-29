export interface IRoom {
  id: number;
  checkIn: Date;
  checkOut: Date;
  rootType: string;
  guestsCount: number;
  fullName: string;
  phoneNumber: string;
  specialRequests: string;
}
