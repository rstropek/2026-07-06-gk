Jetzt machen wir aus dem POC einen echten Chatbot.

Backend:
* Microsoft Agent Framework (bitte recherchieren!)
* Es gibt einen OpenAI API Key in OPENAI_API_KEY (User Secrets)

Schnittstelle zwischen Backend und Frontend:
* AG-UI

Frontend:
* Eingabefeld am unteren Rand des Browserfensters
* Drüber Chat-Historie
* Klare, visuelle Trennung zwischen User and Agent Messages
* Bleib beim bunten Design
* Ping/Pong können wir im Client streichen
* e2e:
  * Eingabe irgend einer Nachricht
  * LLM muss mit einer Antwort <> leer antworten
