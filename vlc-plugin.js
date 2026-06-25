/*
 * Plugin Name: VLC External Player
 * Plugin Version: 1.1
 * Plugin Author: Claude
 * Plugin Description: Открывает видео в VLC плеере
 */
(function () {
    'use strict';

    var checkInterval;

    function getVideoUrl() {
        var video = document.querySelector('video');
        if (video && video.src && video.src.indexOf('blob:') === -1) {
            return video.src;
        }
        return null;
    }

    function removeBtn() {
        var old = document.getElementById('vlc-ext-btn');
        if (old) old.remove();
    }

    function addBtn(url) {
        removeBtn();
        var btn = document.createElement('div');
        btn.id = 'vlc-ext-btn';
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
            'letter-spacing:1px'
        ].join(';');

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            window.location.href = 'vlc://' + url;
        });

        document.body.appendChild(btn);
    }

    function startWatch() {
        if (checkInterval) clearInterval(checkInterval);
        checkInterval = setInterval(function () {
            var url = getVideoUrl();
            var existing = document.getElementById('vlc-ext-btn');
            var video = document.querySelector('video');

            if (url && video) {
                if (!existing) addBtn(url);
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
