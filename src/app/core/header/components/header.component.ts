import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PORTFOLIO_ROUTES } from 'src/app/app-routing.module';
import { ScrollWrapperService } from 'src/app/core/scroll-wrapper/scroll-wrapper.module';
import { ViewportService } from 'src/app/shared/viewport/viewport.service';

@UntilDestroy()
@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('staggerInOut', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateX(-250px)', }),
          stagger(75, [ animate('0.25s', style({ transform: 'translateX(0)' })) ])
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0)', }),
          stagger(50, [ animate('0.15s', style({ transform: 'translateX(-250px)' })) ])
        ], { optional: true }),
      ])
    ])
  ],
})
export class HeaderComponent {
  readonly ROUTES = PORTFOLIO_ROUTES;
  menuToggled = false;
  showHamburger$ = this.viewportService.observe$('M', false).pipe(untilDestroyed(this));

  constructor(
    private scrollWrapperService: ScrollWrapperService,
    private viewportService: ViewportService,
  ) { }

  onMenuToggle(): void {
    this.menuToggled = !this.menuToggled;
    this.scrollWrapperService.update({ menuToggled: this.menuToggled });
  }
}
