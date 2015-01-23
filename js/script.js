(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-19608894-25', 'auto');
ga('send', 'pageview');

/*                       *\
   Google analytics widget
\*                       */
// notify google when page change
function onPageChangeGA(newUrl){
    var currentPage = newUrl.substr(newUrl.indexOf('#!page-') + 7);
    ga('send', 'pageview', {
      'page': '/' + currentPage,
      'title': currentPage
    });
}
$(window).bind( 'hashchange', function (e){
    onPageChangeGA(e.originalEvent.newURL);
});
// track links and form submissions
$(function(){
    $('a, [data-silex-href]').click(onClick);
    $('form').submit(onSubmit);
    function onSubmit() {
        onClick.call(this, true, 'submit');
    }
    function onClick(opt_doNotPrevent, opt_link) {
        var text = ($(this).text() || this.tagName).trim();
        var link = this.getAttribute('href') || this.getAttribute('data-silex-href') || opt_link || '';
        var target = this.getAttribute('target') || this.getAttribute('data-silex-target') || '_self';
        trackLink(text, link, target);
        if (!opt_doNotPrevent) {
            return false;
        }
    }
    function trackLink(text, url, target){
        ga('send', 'event', 'outbound', 'link', text + ' (' + url +')', {'hitCallback':
            function () {
                if (!target || target === '_self') {
                    document.location = url;
                }
            }
        });
    }
});

/*                      *\
     Google experiment
\*                      */
function utmx_section(){}function utmx(){}(function(){var
k='96694185-3',d=document,l=d.location,c=d.cookie;
if(l.search.indexOf('utm_expid='+k)>0)return;
function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
'<sc'+'ript http://preprod.silex.me/api/1.0/dropbox/exec/get/sites-silex/monitoshi/editable.htmlhttp://editor.silex.me/api/1.0/dropbox/exec/get/sites-silex/monitoshi/editable.htmlsrc="'+'http'+(l.protocol=='https:'?'s://ssl':
'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
'" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();

utmx('url','A/B');
