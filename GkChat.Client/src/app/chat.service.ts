import { type AgentSubscriber, HttpAgent, type Message } from "@ag-ui/client";
import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../environments/environment";

export interface ChatMessage {
  readonly id: string;
  readonly role: "user" | "assistant";
  readonly content: string;
  readonly status: "complete" | "streaming" | "error";
}

@Injectable({ providedIn: "root" })
export class ChatService {
  readonly #agent = new HttpAgent({
    url: `${environment.apiBaseUrl}/chat`,
    threadId: this.#createId("thread"),
  });
  readonly #messages = signal<ChatMessage[]>([]);
  readonly #isSending = signal(false);
  readonly #error = signal("");

  readonly messages = this.#messages.asReadonly();
  readonly isSending = this.#isSending.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly hasMessages = computed(() => this.#messages().length > 0);

  async send(content: string): Promise<void> {
    const text = content.trim();
    if (!text || this.#isSending()) {
      return;
    }

    this.#error.set("");
    this.#isSending.set(true);

    const userMessage: Message = {
      id: this.#createId("user"),
      role: "user",
      content: text,
    };
    this.#agent.addMessage(userMessage);
    this.#messages.update((messages) => [
      ...messages,
      { id: userMessage.id, role: "user", content: text, status: "complete" },
    ]);

    const subscriber = this.#createSubscriber();

    try {
      const result = await this.#agent.runAgent({ runId: this.#createId("run") }, subscriber);
      this.#applyFinalAssistantMessages(result.newMessages);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "The agent request failed.";
      this.#error.set(message);
      this.#markStreamingMessageAsError(message);
    } finally {
      this.#isSending.set(false);
    }
  }

  #createSubscriber(): AgentSubscriber {
    return {
      onTextMessageStartEvent: ({ event }) => {
        this.#messages.update((messages) => [
          ...messages,
          {
            id: event.messageId,
            role: "assistant",
            content: "",
            status: "streaming",
          },
        ]);
      },
      onTextMessageContentEvent: ({ event }) => {
        this.#appendToAssistantMessage(event.messageId, event.delta);
      },
      onTextMessageEndEvent: ({ event, textMessageBuffer }) => {
        this.#completeAssistantMessage(event.messageId, textMessageBuffer);
      },
      onRunErrorEvent: ({ event }) => {
        this.#error.set(event.message);
        this.#markStreamingMessageAsError(event.message);
      },
      onRunFailed: ({ error }) => {
        this.#error.set(error.message);
        this.#markStreamingMessageAsError(error.message);
      },
    };
  }

  #appendToAssistantMessage(id: string, delta: string): void {
    this.#messages.update((messages) =>
      messages.map((message) =>
        message.id === id
          ? { ...message, content: `${message.content}${delta}`, status: "streaming" }
          : message,
      ),
    );
  }

  #completeAssistantMessage(id: string, content: string): void {
    this.#messages.update((messages) =>
      messages.map((message) =>
        message.id === id ? { ...message, content, status: "complete" } : message,
      ),
    );
  }

  #markStreamingMessageAsError(error: string): void {
    this.#messages.update((messages) =>
      messages.map((message) =>
        message.role === "assistant" && message.status === "streaming"
          ? { ...message, content: message.content || error, status: "error" }
          : message,
      ),
    );
  }

  #applyFinalAssistantMessages(newMessages: Message[]): void {
    const assistantMessages = newMessages.filter(
      (message) => message.role === "assistant" && typeof message.content === "string",
    );

    for (const message of assistantMessages) {
      const content = typeof message.content === "string" ? message.content : "";
      if (!content.trim()) {
        continue;
      }

      const visibleMessage = this.#messages().find((item) => item.id === message.id);
      if (visibleMessage) {
        this.#completeAssistantMessage(message.id, content);
      }
    }
  }

  #createId(prefix: string): string {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
}
