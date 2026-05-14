module.exports = {
  // Foldery wejściowe i wyjściowe
  inputDir: 'input',
  outputDir: 'output',

  // Jakie formaty wyjściowe chcemy wygenerować
  // (np. 'avif', 'webp', 'jpeg')
  formats: ['avif', 'webp', 'jpeg'],

  // Zdefiniowane rozmiary (szerokości) dla punktów przerwania
  // Wartości liczbowe oznaczają szerokość w pikselach
  sizes: {
    thumb: 400,    // siatka miniatur
    small: 800,    // mały telefon / szybki podgląd
    medium: 1200,  // telefon/tablet
    large: 1800,   // laptop / większy podgląd
    xlarge: 2400   // duży ekran / fullscreen
  },

  // Konfiguracja jakości dla poszczególnych formatów
  // Parametr m.in. quality (1-100), effort (np. w avif)
  formatOptions: {
    avif: {
      quality: 80,
      effort: 4 // effort określa kompromis między czasem kodowania a wielkością (1-9)
    },
    webp: {
      quality: 80,
      effort: 4 // effort (0-6)
    },
    jpeg: {
      quality: 80,
      mozjpeg: true // Lepsza kompresja JPEG
    }
  }
};
