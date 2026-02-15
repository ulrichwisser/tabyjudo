# Täby Judoklubb - Webbplatsdokumentation

## Innehållsförteckning
1. [Bildhantering](#bildhantering)
2. [Nyhetsflöde](#nyhetsflöde)
3. [Allmänt underhåll](#allmänt-underhåll)

## Bildhantering

### Hero-bakgrundsbild

Hero-bakgrundsbilden konfigureras i `style.css` omkring rad 475:

```css
#hero {
    background-image: url('./bilder/hero.png');
}
```

För att ändra bilden, placera en ny fil i mappen `bilder` och uppdatera sökvägen i CSS. Motsvarande CSS finns även för `#about-hero` och `#groups-hero`.

### Övriga bilder

Bilder lagras i mappen `bilder`. Logotypen refereras i HTML enligt följande:

```html
<img src="./bilder/tbyjdologga.png" alt="Täby Judo Logo" class="logo-img">
```

## Nyhetsflöde

Nyhetsflödet hämtas via RSS från tabyjudo.se. Konfiguration i `news.js`:

### RSS-källa

```javascript
const rssUrl = 'https://tabyjudo.se/Home/NewsRss';
```

Vid problem, verifiera att URL:en är korrekt och kontrollera eventuella konsolfel i webbläsarens utvecklarverktyg (F12).

### Bildhantering i nyheter

Följande kod i `news.js` hanterar bildformat:

```javascript
//om det är en bild och den har _small, _medium eller _large i sig så ta bort det så att den inte blir suddigare än den behöver vara
if (imageUrl) {
    const imageParts = imageUrl.split('_');
    if (imageParts.length > 1) {
        imageUrl = imageParts.slice(0, -1).join('_') + '.' + imageParts[imageParts.length - 1].split('.').pop();
    }
}
```

### Antal nyheter

Antalet nyheter som visas styrs av variabeln `maxNewsItems` i `news.js`:

```javascript
const maxNewsItems = 3; // Maximala antal nyheter att visa
```

## Allmänt underhåll

### HTML-innehåll

Innehållet finns i HTML-filerna: `index.html`, `about.html`, `groups.html` och `signup.html`.

### CSS-stilar

Färgschema och andra stilar definieras i `style.css`. Huvudfärgerna är konfigurerade som CSS-variabler:

```css
:root {
    --primary-color: #286bc4;
    --secondary-color: #1d3557;
    --light-color: #f1faee;
    --dark-color: #1d3557;
    --accent-color: #457b9d;
    --transition: all 0.3s ease;
}
```