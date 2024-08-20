import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() text: string = 'Add to Carder';
  @Input() backgroundColor: string = 'bg-white';
  @Input() textColor: string = 'text-black';
  @Input() width: string = 'w-auto';
  @Input() borderRadius: string = 'rounded-md';
  @Input() border: string = 'border-red';

}
