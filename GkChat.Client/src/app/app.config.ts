import { provideHttpClient } from "@angular/common/http";
import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { environment } from "../environments/environment";
import { provideGkChatClient } from "./api-client";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideGkChatClient({ basePath: environment.apiBaseUrl }),
    provideRouter(routes),
  ],
};
