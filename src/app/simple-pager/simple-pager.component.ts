import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-pager',
  styleUrls: ['./simple-pager.component.css'],
  template: `
    <div>
      <span class="item" [class.disabled]="!hasPrev" (click)="prev.next()">prev</span>
      <span class="item" [class.disabled]="!hasNext" (click)="next.next()">next</span>
    </div>
  `
})
export class SimplePagerComponent {
  @Input() hasPrev: boolean;
  @Input() hasNext: boolean;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
