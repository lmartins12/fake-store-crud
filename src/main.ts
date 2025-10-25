import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.config';
import { ThemeService } from '@core/index';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    const themeService = appRef.injector.get(ThemeService);
    themeService.initTheme();
  })
  .catch((err) => console.error(err));
