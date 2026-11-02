# Lottie animationer og JavaScript

----

## Ideer fra Claude Haiku
  Denne tutorial er lavet med lidt hjælp fra Claude AI på DuckDuckGo.

### Eksport fra Jitter/Figma

Når du eksporterer din JSON fra Figma må der ikke være mellemrum til filnavnet. Danske specialtegn bør også undgås. 

Jeg måtte omdøbe fra: `Jitter Frame 1.json` til `jitterframe.json`. Så virkede koden.

Så undgå mellemrum i filnavnet.

### HTML

Indsæt dette script i filens `<head>` afdeling:

~~~~ 
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.10.2/lottie.min.js"></script>
~~~~

Et passende sted i `<body>` skal der være en HTML-container til animationen:

~~~~
<div id="jitter-container"></div>
~~~~

Hvordan gøres dette praktisk i WordPress?

### JavaScript

~~~~
const animation = lottie.loadAnimation({
  container: document.getElementById('jitter-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'jitterframe.json' // Stien til din jitter-json fil
});
~~~~

### Eksempel: Knapper

Herunder er nogen eksempler på styring af animationen ved hjælp af knapper. Knapperne behøver ikke at være kedelige grå firkanter. Læg grafik ind i stedet for, og læg en eventlistener på grafikken. 

* Prøv også at lave en knap, der skriver information om fisken i en eller anden faktabox, her bruges typisk den semantiske `<aside>`-tag.

----

~~~~
<div id="jitter-container"></div>

<button id="play-btn">Spill</button>
<button id="pause-btn">Pause</button>
<button id="stop-btn">Stopp</button>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.10.2/lottie.min.js"></script>

<script>
  const animation = lottie.loadAnimation({
    container: document.getElementById('jitter-container'),
    renderer: 'svg',
    loop: true,
    autoplay: false, // Start ikke automatisk
    path: 'jitterframe.json'
  });

  // Knapper

  // play
  document.getElementById('play-btn').addEventListener('click', () => {
    animation.play();
  });

  // pause
  document.getElementById('pause-btn').addEventListener('click', () => {
    animation.pause();
  });

  // stop
  document.getElementById('stop-btn').addEventListener('click', () => {
    animation.stop();
  });
</script>
~~~~

Læg mærke til at knapperne adresserer animationen ved hjælp af dens navn. I dette tilfælde er det:

`animation`

Hvis du har flere animationer, så giv dem forskellige navne. På den måde kan du lave knapper til de forskellige fisk og sætstykker. 

## Eksemplerne

* lottieSemantisk.html: så enkel som muligt; men med en mere semantisk korrekt markup. Bemærk, at renderer kan være canvas eller svg.
* jitterAnimation.html: her med en lottie, som er skabt og eksporteret som JSON i Jitter. Knapper starter og stopper animationen. Lyd startes og stoppes med vanlige JavaScript greb.
* lottieLoop.html: eksempel på et loop, der genbruger animationen og smækker dem ind overalt.
* sneFlokkeCanvasLoop.html: viser, hvordan et canvas-element kan indeholde animationsstumper. 
