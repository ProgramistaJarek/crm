import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-password-strength-bar',
  template: `
    <div class="strength">
      <ul class="strengthBar mt-2">
        <li class="point" [style.background-color]="bar1"></li>
        <li class="point" [style.background-color]="bar2"></li>
        <li class="point" [style.background-color]="bar3"></li>
        <li class="point" [style.background-color]="bar4"></li>
      </ul>
    </div>
  `,
  styleUrls: ['./password-strength-bar.component.scss'],
})
export class PasswordStrengthBarComponent implements OnChanges {
  @Input() barNumber!: number;
  passwordColor: string[] = ['red', 'yellow', 'orange', 'green'];
  bar1!: string;
  bar2!: string;
  bar3!: string;
  bar4!: string;

  constructor() {}

  ngOnChanges(): void {
    //need to change this......
    this.passwordColor.forEach((color, index) => {
      if (this.barNumber == 0 && index == 0) {
        this.bar1 = '';
        this.bar2 = '';
        this.bar3 = '';
        this.bar4 = '';
      }
      if (this.barNumber == 1 && index == 0) {
        this.bar1 = color;
        this.bar2 = '';
        this.bar3 = '';
        this.bar4 = '';
      }
      if (this.barNumber == 2 && index == 1) {
        this.bar1 = color;
        this.bar2 = color;
        this.bar3 = '';
        this.bar4 = '';
      }
      if (this.barNumber == 3 && index == 2) {
        this.bar1 = color;
        this.bar2 = color;
        this.bar3 = color;
        this.bar4 = '';
      }
      if (this.barNumber == 4 && index == 3) {
        this.bar1 = color;
        this.bar2 = color;
        this.bar3 = color;
        this.bar4 = color;
      }
    });
  }
}
