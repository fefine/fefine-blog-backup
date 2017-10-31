window.onscroll = function () {
    var maxLength = document.scrollingElement.scrollHeight - window.screen.height;
    var nowLength = document.scrollingElement.scrollTop;
    var p = nowLength / maxLength;
    document.getElementsByTagName('header').item(0).style.backgroundColor = 'rgba(39, 156, 150, ' + (1 - p) + ')';
}
// load header
if ($('header').html().trim() === '') {
    $('header').load('./header.html');
}