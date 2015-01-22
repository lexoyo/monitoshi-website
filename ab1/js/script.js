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
