(function () {
  // ===== DINE TEKSTER =====
  // Navnet ("telecaster") skal matche data-tekster="..." i HTML-fanen.
  // Tider skrives som tt:mm:ss.mmm --> tt:mm:ss.mmm, med en tom linje mellem hvert stykke.
  var TEKSTER = {
    telecaster: `WEBVTT

00:00:00.000 --> 00:00:03.000
Hej og velkommen til denne optagelse.

00:00:03.000 --> 00:00:07.000
Teksterne her vises synkront med lyden.

00:00:07.000 --> 00:00:11.000
Klik på en linje nedenfor for at springe dertil.
`
  };
  // ===== SLUT PÅ TEKSTER =====

  function start() {
    document.querySelectorAll('.tl-afspiller:not([data-klar])').forEach(function (boks) {
      var vtt = TEKSTER[boks.dataset.tekster];
      if (!vtt) return;
      boks.setAttribute('data-klar', '1');

      var lyd = boks.querySelector('audio');
      var tekstfelt = boks.querySelector('.tl-tekst');
      var liste = boks.querySelector('.tl-liste');

      vtt = vtt.split('\n').map(function (l) { return l.trim(); }).join('\n').trim();

      var track = document.createElement('track');
      track.kind = 'captions';
      track.srclang = 'da';
      track.label = 'Dansk';
      track.default = true;
      track.src = URL.createObjectURL(new Blob([vtt], { type: 'text/vtt' }));
      lyd.appendChild(track);
      track.track.mode = 'hidden'; // <audio> viser ikke selv tekster

      track.addEventListener('load', function () {
        Array.prototype.forEach.call(track.track.cues, function (cue) {
          var li = document.createElement('li');
          li.dataset.start = cue.startTime;
          var knap = document.createElement('button');
          knap.type = 'button';
          var tid = document.createElement('span');
          tid.className = 'tl-tid';
          tid.textContent = formaterTid(cue.startTime);
          knap.appendChild(tid);
          knap.appendChild(document.createTextNode(cue.text));
          knap.addEventListener('click', function () {
            lyd.currentTime = cue.startTime;
            lyd.play();
          });
          li.appendChild(knap);
          liste.appendChild(li);
        });
      });

      track.track.addEventListener('cuechange', function () {
        var aktiv = track.track.activeCues[0];
        tekstfelt.textContent = aktiv ? aktiv.text : '';
        liste.querySelectorAll('li').forEach(function (li) {
          li.classList.toggle('tl-aktiv', !!aktiv && Number(li.dataset.start) === aktiv.startTime);
        });
      });
    });
  }

  function formaterTid(sek) {
    var m = Math.floor(sek / 60);
    var s = String(Math.floor(sek % 60)).padStart(2, '0');
    return m + ':' + s;
  }

  // Vent til siden er indlæst, hvis JS-fanen køres før HTML'en findes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
