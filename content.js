if (window.location.host === 'welcomepro.bitrix24.ru') {

    function visible(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }

    function findPopup() {
        let all = document.querySelectorAll('a.bx-messenger-popup-menu-item');
        let i;
        for (i in all) {
            if (isNaN(i)) break;
            if (all[i].href && all[i].href.indexOf('/crm/company/details/') != -1) {
                return all[i].href;
            }
        }
        if (i) {
            return false;
        }
    }

    var objIframe;
    var objIframeUrl = {};

    function showIframe(url) {
        if (objIframe) objIframe.style.display = 'none';
        if (!objIframeUrl[url]) {
            objIframeUrl[url] = createIframe(url);
        }

        objIframe = objIframeUrl[url];
        objIframe.style.display = 'inline-block';
    }

    function createIframe(url) {
        let O = document.createElement('iframe');
        // O.src = url;
        O.src = url;
        O.allowTransparency = true;
        O.style.display = 'inline-block';
        O.style['vertical-align'] = 'top';
        O.style['height'] = '100%';
        O.style['width'] = '30%';
        // O.style.position = 'fixed';
        // O.style.top = '0px';
        // O.style['background-color'] = '#FFF';
        O.style['border'] = '2px solid #0f0';
        // O.style.height = '300px';
        // O.style['z-index'] = '2';
        O.load = O.onload = function (event) {
            loadStyleEx(this.contentWindow.document, '\
            \
            \
            .crm-entity-section-tabs,\
            .crm-entity-stream-container\
            {display: none;}\
            \
            .crm-entity-card-container\
            {width: 100%}\
            \
            /* Шапка - компании. Пример: Супра */ \
            .crm-iframe-header\
            {position: sticky;\
    top: 0px;\
    z-index: 141;\
    background: #eef2f4aa;}\
            \
            \
            \
            \
            ');


        };
        document.all('bx-desktop-tab-content-im').insertBefore(O, document.all('bx-desktop-tab-content-im').children[0]);
        return O;
    }

    function findChat() {
        let all = document.querySelectorAll('.bx-messenger-panel-button.bx-messenger-panel-menu');

        for (let i in all) {
            if (isNaN(i)) break;
            if (visible(all[i]) && !document.querySelector('a.bx-messenger-popup-menu-item')) {
                all[i].click();
                let url = findPopup();
                if (url) {
                    showIframe(url + '?IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER');
                } else if (url === false) {
                    showIframe('javascript:void(0)');
                }
                all[i].click();
            }
        }
        /*window.onbeforeunload = function (e) {
            return 'Проверьте:';
        };*/
    }

// setTimeout(findChat, 10000);
    setInterval(findChat, 1000);


    loadStyle('\
    .bx-messenger-global-context-popup-fullscreen {\
        display: inline-block;\
        width: 60%;\
    }\
    ');
}






