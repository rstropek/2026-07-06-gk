import { InjectionToken } from "@angular/core";
import { HttpInterceptor, HttpContextToken } from "@angular/common/http";

/**
 * Injection token for the GkChat client base API path
 */
export const BASE_PATH_GKCHAT = new InjectionToken<string>('BASE_PATH_GKCHAT', {
    providedIn: 'root',
    factory: () => '/api', // Default fallback
});
/**
 * Injection token for the GkChat client HTTP interceptor instances
 */
export const HTTP_INTERCEPTORS_GKCHAT = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS_GKCHAT', {
    providedIn: 'root',
    factory: () => [], // Default empty array
});
/**
 * HttpContext token to identify requests belonging to the GkChat client
 */
export const CLIENT_CONTEXT_TOKEN_GKCHAT = new HttpContextToken<string>(() => 'GkChat');
