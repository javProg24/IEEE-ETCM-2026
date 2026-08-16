(function () {
  var img = document.getElementById('ieee-programa-img');
  var lightbox = document.getElementById('ieee-programa-lightbox');
  var lightboxImg = document.getElementById('ieee-programa-lightbox-img');

  if (!img || !lightbox || !lightboxImg) return;

  img.addEventListener('click', function () {
    lightboxImg.src = img.src;
    lightbox.classList.add('is-open');
  });

  lightbox.addEventListener('click', function () {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('is-open');
      lightboxImg.src = '';
    }
  });
})();

(function () {
  var link = document.querySelector('#ieee-programa .programa-download');
  if (!link) return;

  link.addEventListener('click', function (e) {
    var url = link.getAttribute('href');
    var filename = link.getAttribute('download') || 'IEEE-ETCM-2026-General-Program.pdf';

    e.preventDefault();

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('network response was not ok');
        return res.blob();
      })
      .then(function (blob) {
        var blobUrl = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.download = filename;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(function () {
        window.location.href = url;
      });
  });
})();