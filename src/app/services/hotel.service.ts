import { Injectable } from '@angular/core';
import { IRoom } from '../models/i-room';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private rooms: IRoom[] = [];
  private readonly storageKey = 'rooms';

  constructor()  {
    this.rooms = this.readRooms();
  }

  getRooms(): IRoom[] {
    return [...this.rooms];
  }

  getRoomsById(id: number): IRoom | undefined {
    return this.rooms.find((room) => room.id === id);
  }

  addRooms(room: IRoom): void {
    this.rooms = [...this.rooms, room];
    this.saveRooms();
  }

  deleteRoom(id: number): void {
    this.rooms = this.rooms.filter((room) => room.id !== id);
    this.saveRooms();
  }

  updateRoom(id: number, updateRoom: IRoom): void {
    this.rooms = this.rooms.map((item) => {
      if (item.id === id) {
        return updateRoom;
      }
      return item;
    });
    this.saveRooms();
  }

  private readRooms(): IRoom[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const rawRooms = localStorage.getItem(this.storageKey);

    if (!rawRooms) {
      return [];
    }

    try {
      const parsedRooms: unknown = JSON.parse(rawRooms);
      return this.normalizeRooms(parsedRooms);
    } catch {
      return [];
    }
  }

  private normalizeRooms(parsedRooms: unknown): IRoom[] {
    if (Array.isArray(parsedRooms)) {
      return parsedRooms.flatMap((room) => {
        const normalizedRoom = this.normalizeRoom(room);
        return normalizedRoom ? [normalizedRoom] : [];
      });
    }

    const normalizedRoom = this.normalizeRoom(parsedRooms);
    return normalizedRoom ? [normalizedRoom] : [];
  }

  private normalizeRoom(room: unknown): IRoom | null {
    if (!room || typeof room !== 'object') {
      return null;
    }

    const candidate = room as Partial<IRoom>;

    if (
      candidate.id === undefined ||
      candidate.checkIn === undefined ||
      candidate.checkOut === undefined ||
      candidate.roomType === undefined ||
      candidate.guestsCount === undefined ||
      candidate.fullName === undefined ||
      candidate.phoneNumber === undefined
    ) {
      return null;
    }

    return {
      id: Number(candidate.id),
      checkIn: this.normalizeDate(candidate.checkIn),
      checkOut: this.normalizeDate(candidate.checkOut),
      roomType: String(candidate.roomType),
      guestsCount: Number(candidate.guestsCount),
      fullName: String(candidate.fullName),
      phoneNumber: String(candidate.phoneNumber),
    };
  }

  private normalizeDate(value: string): string {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value.slice(0, 10) : date.toISOString().slice(0, 10);
  }

  private saveRooms(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.rooms));
  }
}
