document.addEventListener("DOMContentLoaded", function () {
    var spotlightCards = document.querySelectorAll('.card-spotlight');

    spotlightCards.forEach(function(card) {
    var spotlightColor = card.dataset.spotlight || 'rgba(255, 255, 255, 0.25)';

    card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
        card.style.setProperty('--spotlight-color', spotlightColor);
    });
    });
});