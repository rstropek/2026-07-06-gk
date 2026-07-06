Projektname: GkChat

Ziel:
Einfache KI Chat-Anwendung, die im Lauf der Zeit an Funktionalität wachsen wird

Ziel des Sprints:
Erstellen der Anwendungsstruktur, eine "ping"/"pong"-Funktion, triviales Angular-Frontend, das die API aufruft, um die Konnektivität zu testen.

TechStack:
* .NET 10
* ASP.NET Core Minimal API mit C# im Backend
* .NET xUnit für Tests
* Angular (neueste Version) für das Frontend
  * Im Moment keine Unit-Tests im Frontend
  * Zum Anlegen auf die angular-new-app Skill achten
* CSS ohne Framework
* Für dev: Getrennt hosten mit CORS allow all

.NET Design:
* Alle Endpunkte zu einem Thema müssen in einer Datei zusammengefasst werden (z.B. PingEndpoints.cs). Verwende dafür die neue Extension Block-Funktion von C# (das ist neu für dich, recherchieren!)

Angular Design:
* Standalone
* Zoneless

Akzeptanzkriterien:
* Im Wurzelverzeichnis gibt es eine .NET .slnx-Datei
* Es gibt einen Test, der 1+1 = 2 prüft, damit wir sehen, ob Tests grundsätzlich funktionieren
* Das Backend hat eine API, die auf GET /ping mit "pong" antwortet
* Die Angular-Funktionen hat einen Button, der beim Klicken die API aufruft und das Ergebnis anzeigt
* Alles sieht hübsch aus (ich mag es bunt, mit viel Ultrapink)
* Alles kompiliert ohne Warnungen und Fehler
* Vollständige Code Analysis für C# wird durchgeführt (inkl. Analyse der IDE-Warnungen, dafür wirst du wahrscheinlich eine .editorconfig-Datei anlegen müssen)
* Vollständiges Linting für Angular mit Biome.js
* Vollständige Typeprüfung mit TypeScript (strict)
* Code ist mit dotnet format und Biome.js formatiert
* Füge Playwright in das Angular-Projekt ein und schreibe einen End-to-End-Test, der den Button klickt und prüft, ob das Ergebnis korrekt angezeigt wird
* Alle Tests müssen grün sein
* Schreibe ins AGENTS.md Anweisungen, damit zukünftige Agents wissen, worauf sie achten müssen. Kein Mikro-Management, nur Dinge, die nicht offensichtlich sind.