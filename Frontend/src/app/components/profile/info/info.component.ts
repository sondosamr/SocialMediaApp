import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() userData: any; 
  @Output() closePopup = new EventEmitter<void>();

  close(): void {
    this.closePopup.emit(); 
  }
}
