/*
 * Plugin Name: VLC External Player
 * Plugin Version: 1.2
 * Plugin Author: Claude
 * Plugin Description: Открывает видео в VLC плеере
 */
(function () {
    'use strict';

    var checkInterval;

    function removeBtn() {
        var old = document.getElementById('vlc-ext-btn');
        if (old) old.remove();
    }

    function addBtn(url) {
        removeBtn();

        var btn = document.createElement('a');
        btn.id = 'vlc-ext-btn';
        btn.href = 'vlc://' + url;
        btn.innerText = 'VLC';
        btn.title = 'Открыть в VLC';
        btn.style.cssText = [
            'position:fixed',
            'bottom:90px',
            'right:24px',
            'background:rgba(20,20,20,0.9)',
            'color:#fff',
            'padding:8px 14px',
            'border-radius:6px',
            'cursor:pointer',
            'font-size:13px',
            'font-weight:bold',
            'z-index:2147483647',
            'border:1px solid rgba(255,255,255,0.25)',
            'letter-spacing:1px',
            'text-decoration:none',
            'display:block'
        ].join(';');

        document.body.appendChild(btn);
    }

    function startWatch() {
        if (checkInterval) clearInterval(checkInterval);
        checkInterval = setInterval(function () {
            var video = document.querySelector('video');
            var existing = document.getElementById('vlc-ext-btn');

            if (video && video.src && video.src.indexOf('blob:') === -1 && video.src.indexOf('http') === 0) {
                if (!existing || existing.href !== 'vlc://' + video.src) {
                    addBtn(video.src);
                }
            } else {
                removeBtn();
            }
        }, 1000);
    }

    function init() {
        if (typeof Lampa === 'undefined') {
            setTimeout(init, 300);
            return;
        }
        startWatch();
    }

    init();
})();
