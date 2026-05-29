import { Injectable } from '@angular/core';
import { IRoom } from '../models/i-room';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private rooms: IRoom[] = [];

  getRooms(): IRoom[] {
    return this.rooms;
  }

  getRoomsById(id: number): IRoom | undefined {
    return this.rooms.find((room) => room.id === id);
  }

  addRooms(room: IRoom): void {
    this.rooms.push(room);
  }

  deleteRoom(id: number): void {
    this.rooms = this.rooms.filter((room) => room.id !== id);
  }

  updateRoom(updateRoom: IRoom): void {
    this.rooms = this.rooms.map((item) => {
      if (item.id === updateRoom.id) {
        return updateRoom;
      }
      return item;
    });
  }
}
