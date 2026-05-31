import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IRoom } from '../models/i-room';

@Component({
  selector: 'app-hotel-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './hotel-form.html',
  styleUrls: ['./hotel-form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelForm {
  protected readonly hotelService = inject(HotelService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly roomTypes = ['Standard', 'Deluxe', 'Suite'] as const;
  protected roomId: number | null = null;
  protected submitted = false;

  rentedRooms: FormGroup = new FormGroup({
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
    roomType: new FormControl('', [Validators.required]),
    guestsCount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
  });

  constructor() {
    const roomId = this.activatedRoute.snapshot.paramMap.get('id');
    this.roomId = roomId && !Number.isNaN(Number(roomId)) ? Number(roomId) : null;

    if (this.roomId !== null) {
      const room = this.hotelService.getRoomsById(this.roomId);
      if (room) {
        this.rentedRooms.patchValue({
          checkIn: this.toDateInputValue(room.checkIn),
          checkOut: this.toDateInputValue(room.checkOut),
          roomType: room.roomType,
          guestsCount: room.guestsCount,
          fullName: room.fullName,
          phoneNumber: room.phoneNumber,
        });
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.rentedRooms.invalid) {
      this.rentedRooms.markAllAsTouched();
      return;
    }

    const formValue = this.rentedRooms.getRawValue();
    const room: IRoom = {
      id: this.roomId ?? Date.now(),
      checkIn: String(formValue.checkIn),
      checkOut: String(formValue.checkOut),
      roomType: String(formValue.roomType),
      guestsCount: Number(formValue.guestsCount),
      fullName: String(formValue.fullName).trim(),
      phoneNumber: String(formValue.phoneNumber).trim(),
    };

    if (this.roomId !== null) {
      this.hotelService.updateRoom(this.roomId, room);
    } else {
      this.hotelService.addRooms(room);
    }

    this.router.navigate(['/list']);
  }

  protected isInvalid(controlName: string): boolean {
    const control = this.rentedRooms.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  private toDateInputValue(value: string): string {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime()) ? value.slice(0, 10) : parsedDate.toISOString().slice(0, 10);

  }
}
