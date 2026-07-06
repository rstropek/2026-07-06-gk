import { HttpClient } from "@angular/common/http";
import { Component, computed, inject, signal } from "@angular/core";

const pingUrl = "http://localhost:5179/ping";

type PingStatus = "idle" | "loading" | "success" | "error";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  readonly #httpClient = inject(HttpClient);

  protected readonly result = signal("");
  protected readonly status = signal<PingStatus>("idle");
  protected readonly statusText = computed(() => {
    switch (this.status()) {
      case "loading":
        return "Connecting...";
      case "success":
        return "Connected";
      case "error":
        return "Connection failed";
      default:
        return "Ready";
    }
  });

  protected ping(): void {
    this.status.set("loading");
    this.result.set("");

    this.#httpClient.get(pingUrl, { responseType: "text" }).subscribe({
      next: (response) => {
        this.result.set(response);
        this.status.set("success");
      },
      error: () => {
        this.status.set("error");
      },
    });
  }
}
