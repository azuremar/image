# Generator Zdjęć do Galerii

Szybki, lokalny generator obrazków zoptymalizowanych pod kątem nowoczesnych galerii internetowych. Używa biblioteki `sharp` (Node.js) do błyskawicznego przetwarzania.

## Funkcje
- Automatyczne skalowanie do zdefiniowanych szerokości (np. thumb, small, medium, large, xlarge).
- Konwersja na najnowsze formaty kompresji (**AVIF**, **WebP**) oraz **JPEG** jako fallback.
- Zachowywanie metadanych zdjęcia (EXIF).
- Automatyczne tworzenie struktury folderów wyjściowych dla łatwego sortowania (np. `output/medium/...`).
- Elastyczna konfiguracja w pliku `config.js`.

## Wymagania
- Zainstalowane środowisko Node.js (v18+)

## Instalacja

1. Pobierz pliki projektu.
2. Zainstaluj zależności:
   ```bash
   npm install
   ```

## Użycie

1. Otwórz plik `config.js` i dostosuj rozmiary (szerokości w pikselach), jakość oraz formaty docelowe, jeśli potrzebujesz innych ustawień niż domyślne.
2. Wrzuć swoje najwyższej jakości oryginały (najlepiej `.tif`, `.tiff` lub `.jpg` wysokiej jakości prosto z eksportu) do folderu `input/`.
3. Uruchom skrypt:
   ```bash
   node index.js
   ```
4. Odbierz wygenerowane pliki gotowe do wysłania na hosting z folderu `output/`. Struktura folderów jest automatycznie posortowana według rozmiaru i formatów. Oryginalne pliki bez zmian są skopiowane do folderu `output/original/`.

## Konfiguracja
Plik `config.js` posiada czytelne sekcje:
- **`inputDir` / `outputDir`**: Ścieżki bazowe.
- **`sizes`**: Definiujesz własne nazwy breakpointów i przypisaną im szerokość.
- **`formatOptions`**: Ustawienia jakości (`quality`), poziomu kompresji (`effort`) dla konkretnych formatów.
