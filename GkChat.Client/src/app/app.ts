import { Component, computed, inject, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { PingService } from "./api-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  readonly #pingService = inject(PingService);
  readonly #pingRequest = signal<number | undefined>(undefined);

  protected readonly pingResource = rxResource({
    params: () => this.#pingRequest(),
    stream: () => this.#pingService.ping(),
  });
  protected readonly result = computed(() =>
    this.pingResource.hasValue() ? this.pingResource.value() : "",
  );
  protected readonly isConnected = computed(() => {
    const status = this.pingResource.status();
    return status === "resolved" || status === "local";
  });
  protected readonly isError = computed(() => this.pingResource.status() === "error");
  protected readonly statusText = computed(() => {
    switch (this.pingResource.status()) {
      case "loading":
      case "reloading":
        return "Connecting...";
      case "resolved":
      case "local":
        return "Connected";
      case "error":
        return "Connection failed";
      default:
        return "Ready";
    }
  });

  protected ping(): void {
    this.#pingRequest.update((request) => (request ?? 0) + 1);
  }
}
