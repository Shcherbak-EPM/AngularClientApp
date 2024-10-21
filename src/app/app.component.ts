import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/shared/header/header.component';
import { SearchComponent } from '@components/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SearchComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularClientApp';
}
