const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const config = require('./config');

const inputDir = path.join(__dirname, config.inputDir);
const outputDir = path.join(__dirname, config.outputDir);

// Funkcja pomocnicza: Sprawdza, czy plik to obraz na podstawie rozszerzenia
function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.webp'].includes(ext);
}

// Funkcja pomocnicza: Tworzy folder jeśli nie istnieje
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function processImages() {
  console.log(`Rozpoczynam przetwarzanie z folderu "${config.inputDir}"...`);

  // Utwórz folder wejściowy, jeśli nie ma
  ensureDirExists(inputDir);
  ensureDirExists(outputDir);

  const files = fs.readdirSync(inputDir);
  const images = files.filter(isImage);

  if (images.length === 0) {
    console.log(`Nie znaleziono obrazów w folderze "${config.inputDir}". Dodaj tam pliki (np. JPG, TIFF).`);
    return;
  }

  // Dla każdego rozmiaru stwórz osobny podfolder
  const sizeKeys = Object.keys(config.sizes);
  sizeKeys.forEach(sizeName => {
    ensureDirExists(path.join(outputDir, sizeName));
  });
  // Folder na "oryginały" (np. kopie do pobrania)
  ensureDirExists(path.join(outputDir, 'original'));

  for (const image of images) {
    console.log(`\nPrzetwarzam: ${image}`);
    const inputPath = path.join(inputDir, image);
    const parsedPath = path.parse(image);
    const fileName = parsedPath.name;

    // 1. Kopiuj oryginał
    const originalOutPath = path.join(outputDir, 'original', image);
    fs.copyFileSync(inputPath, originalOutPath);
    console.log(`  - Skopiowano oryginał do /original/${image}`);

    // Przetwarzaj dla każdego zdefiniowanego rozmiaru i każdego formatu
    for (const sizeName of sizeKeys) {
      const width = config.sizes[sizeName];
      const sizeDir = path.join(outputDir, sizeName);

      // Instancja sharp dla konkretnego szerokosci
      // resize: zachowuje proporcje. withoutEnlargement chroni przed powiększaniem małych zdjęć.
      const pipeline = sharp(inputPath)
        .withMetadata() // Zachowaj metadane (EXIF itp.)
        .resize({ width: width, withoutEnlargement: true });

      for (const format of config.formats) {
        // Skonstruuj nową nazwę pliku: taka sama jak oryginał, zmienione rozszerzenie
        const outFileName = `${fileName}.${format}`;
        const outFilePath = path.join(sizeDir, outFileName);

        const formatOpts = config.formatOptions[format] || {};

        try {
          await pipeline
            .clone()
            .toFormat(format, formatOpts)
            .toFile(outFilePath);
          console.log(`  - Zapisano: /${sizeName}/${outFileName}`);
        } catch (err) {
          console.error(`  [Błąd] Generowanie /${sizeName}/${outFileName}:`, err.message);
        }
      }
    }
  }

  console.log('\nPrzetwarzanie zakończone pomyślnie!');
}

processImages().catch(err => {
  console.error('Błąd krytyczny:', err);
});
