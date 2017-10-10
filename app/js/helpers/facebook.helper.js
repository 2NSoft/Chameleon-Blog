/* globals FB */
import Handlebars from 'handlebars';

window.fbAsyncInit = function() {
    FB.init({
        appId: '175454239676730',
        xfbml: true,
        version: 'v2.9',
    });
    FB.AppEvents.logPageView();
};

((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    const js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
})( document, 'script', 'facebook-jssdk');

Handlebars.registerHelper('facebook-btn', function(options) {
    const html = '<script>' +
    'function shareToFacebook() {\n' +
    '    FB.ui( {\n' +
    '            method: "share",\n' +
    '            href: "' + window.location.href() + '"\n' + // eslint-disable-line no-invalid-this, max-len
    '        },\n' +
    '        function(response){});\n' +
    '}\n' +
    '</script>\n' +
    '<button class="item-btn-share" onclick="shareToFacebook()">Facebook</button>'; // eslint-disable-line no-invalid-this, max-len
    return new Handlebars.SafeString( html );
});
