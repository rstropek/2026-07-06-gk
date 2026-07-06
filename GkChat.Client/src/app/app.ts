import { Component, computed, inject, signal } from "@angular/core";
import { FormField, form } from "@angular/forms/signals";
import { ChatService } from "./chat.service";
import { MarkdownPipe } from "./markdown.pipe";

@Component({
  selector: "app-root",
  imports: [FormField, MarkdownPipe],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  readonly #chat = inject(ChatService);

  protected readonly composerModel = signal({
    text: "",
  });
  protected readonly composerForm = form(this.composerModel);
  protected readonly messages = this.#chat.messages;
  protected readonly isSending = this.#chat.isSending;
  protected readonly error = this.#chat.error;
  protected readonly hasMessages = this.#chat.hasMessages;
  protected readonly canSend = computed(
    () => this.composerModel().text.trim().length > 0 && !this.isSending(),
  );

  protected handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    void this.send();
  }

  protected handleComposerKeydown(event: KeyboardEvent): void {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    void this.send();
  }

  protected async send(): Promise<void> {
    const text = this.composerModel().text.trim();
    if (!text || this.isSending()) {
      return;
    }

    this.composerModel.set({ text: "" });
    await this.#chat.send(text);
  }
}
