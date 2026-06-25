/*
 * Plugin Name: VLC External Player
 * Plugin Version: 1.0
 * Plugin Author: Claude
 * Plugin Description: Открывает видео в VLC плеере
 */
(function () {
    'use strict';

    function openInVLC(url) {
        window.location.href = 'vlc://' + url;
    }

    function addButton(player_url) {
        if (!player_url) return;

        var old = document.getElementById('vlc-btn');
        if (old) old.remove();

        var btn = document.createElement('div');
        btn.id = 'vlc-btn';
        btn.innerText = 'Открыть в VLC';
        btn.style.cssText = 'position:fixed;bottom:80px;right:20px;background:rgba(0,0,0,0.8);color:#fff;padding:10px 18px;border-radius:8px;cursor:pointer;font-size:14px;z-index:99999;border:1px solid rgba(255,255,255,0.3)';

        btn.onclick = function (e) {
            e.stopPropagation();
            openInVLC(player_url);
        };

        document.body.appendChild(btn);
    }

    function init() {
        if (typeof Lampa === 'undefined') {
            setTimeout(init, 500);
            return;
        }

        Lampa.Listener.follow('player', function (e) {
            if (e.type === 'start' || e.type === 'play') {
                var url = '';
                try {
                    url = e.object.stream || e.object.url || (e.object.video && e.object.video.url) || '';
                } catch(err) {}
                if (url) setTimeout(function(){ addButton(url); }, 800);
            }
            if (e.type === 'destroy' || e.type === 'close') {
                var b = document.getElementById('vlc-btn');
                if (b) b.remove();
            }
        });
    }

    init();
})();
