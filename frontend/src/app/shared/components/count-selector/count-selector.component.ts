import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'count-selector',
  templateUrl: './count-selector.component.html',
  styleUrls: ['./count-selector.component.scss']
})
export class CountSelectorComponent {

  @Input() count: number = 1;

  @Output() onCountChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() shouldDeleteFromCart: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  countChange() {
    this.onCountChange.emit(this.count);
  }

  decreaseCount(): void {
    if (this.count > 1) {
      this.count--;
      this.countChange();
    } else {
      this.shouldDeleteFromCart.emit(true);
    }
  }

  increaseCount(): void {
    this.count++;
    this.countChange();
  }

}
