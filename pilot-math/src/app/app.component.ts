import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pilot-math';
  appVersion = packageJson.version;

  public faBars = faBars;
}
