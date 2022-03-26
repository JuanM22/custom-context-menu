import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input('data') data: any = undefined;
  @Input('customInfo') customInfo: any = undefined;
  @Input('functionsArray') functionsArray: any | undefined;

  @Output() close = new EventEmitter();
  @Output() doSome = new EventEmitter();

  // Custom outputs //
  @Output() outPut1 = new EventEmitter();
  @Output() outPut2 = new EventEmitter();
  @Output() outPut3 = new EventEmitter();
  @Output() outPut4 = new EventEmitter();
  @Output() outPut5 = new EventEmitter();
  @Output() outPut6 = new EventEmitter();

  menuPosition = '';
  insideCircleStyle = '';
  xCoord = 0;
  yCoord = 0;
  classPrexixes = ['two', 'three', 'four', 'five', 'six'];
  theme: any = '';
  themes = [{ theme: 'light', themeClass: 'menu-light-theme' }, { theme: 'dark', themeClass: 'menu-dark-theme' }];
  prefix = '';

  outPutList = [this.outPut1, this.outPut2, this.outPut3, this.outPut4, this.outPut5, this.outPut6];

  constructor(private eRef: ElementRef) {
  }

  ngOnInit(): void {
    if (this.data.icons.length >= 2 && this.data.icons.length <= 6) {
      this.setTheme();
      this.setClassPrefix();
      this.connectOutPuts();
      var rect = this.data.event.target.getBoundingClientRect();
      this.xCoord = (this.data.event.clientX - rect.left) + 20;
      this.yCoord = (this.data.event.clientY - rect.top);
      this.menuPosition = `left:${this.xCoord}px; top:${this.yCoord}px;`;
    }
  }

  ngAfterViewInit() {
    if (this.data.icons.length >= 2 && this.data.icons.length <= 6) {
      for (let i = 0; i < this.data.icons.length; i++) {
        let action = this.data.icons[i].title;
        const container = document.getElementById(action);
        if (this.data.icons[i].hasParameters) container?.addEventListener('click', () => this.outPutList[i].emit(this.customInfo));
        else container?.addEventListener('click', () => this.outPutList[i].emit());
      }
    }
  }

  setTheme() {
    this.theme = this.themes.find(t => t.theme === this.data.theme)?.themeClass;
  }

  setClassPrefix(): void {
    this.prefix = this.classPrexixes[this.data.icons.length - 2];
  }

  connectOutPuts(): void {
    for (let i = 0; i < this.data.icons.length; i++) {
      const func: any = this.data.icons[i].callBack;
      this.outPutList[i].subscribe((res: any) => { func(res); this.close.emit(); });
    }
  }

  moveCircleInside(event: any) {
    const container = document.getElementById('menuContainer');
    if (container != undefined) {
      const xPos = event.pageX - container.offsetLeft;
      const yPos = event.pageY - container.offsetTop;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const mouseXpercentage = Math.round(xPos / width * 100);
      const mouseYpercentage = Math.round(yPos / height * 100);
      this.insideCircleStyle = 'background: radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%,' +
        'var(--circle-inside-gradient) 5%, var(--circle-inside-background) 45%);';
    }
  }

  resetCursorPosition(_event: any) {
    this.insideCircleStyle = 'backgroun: radial-gradient(circle at 5% 75%, var(--circle-inside-gradient) 5%, var(--circle-inside-background) 45%);';
  }

  @HostListener('document:click', ['$event'])
  closeOnClickout(event: any) {
    this.closeMenu(event);
  }

  @HostListener('document:keydown', ['$event'])
  closeOnEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeMenu(event);
    }
  }

  closeMenu(event: any): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.close.emit();
    }
  }

}
