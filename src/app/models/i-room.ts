export interface IRoom {
  id: number;
  checkIn: Date;
  checkOut: Date;
  roomType: string;
  guestsCount: number;
  fullName: string;
  phoneNumber: string;
}
