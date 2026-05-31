import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel',
  imports: [RouterLink],
  templateUrl: './hotel.html',
  styleUrl: './hotel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hotel {
  protected readonly stats = [
    { value: '01', label: 'Clean booking flow' },
    { value: '02', label: 'Local storage persistence' },
    { value: '03', label: 'Responsive layout' },
  ];

  protected readonly highlights = [
    {
      title: 'Fast room creation',
      text: 'Capture guest details with reactive forms and validation that keeps bad data out.',
    },
    {
      title: 'Simple editing',
      text: 'Open any room, update the details, and save back to the list without losing context.',
    },
    {
      title: 'Focused overview',
      text: 'Review all bookings in one place with a clear table, empty state, and quick actions.',
    },
  ];
}
