import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorsService } from './errors.service';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorsService, multi: true },
];
