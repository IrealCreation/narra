function isVisibleOnScreen(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    // var elemBottom = elemTop + 44;

    return (docViewTop <= elemTop);
}

function createDOM(element, className, content) {
	var dom = document.createElement(element);
	var jdom = $(dom);

    if(Array.isArray(className)) {
        if(className.length > 0) {
            for(var i = 0; i < className.length; i++) {
                jdom.addClass(className[i]);
            }
        }
    }
    else {
        jdom.addClass(className);
    }
	
    if(typeof content !== 'undefined') {
        jdom.html(content);
    }
	return jdom;
}
function createImg(path) {
    //Ajoute une image à la suite du contenu de dom
    var src = ROOTHTML + "/img/" + path;
    var img = '<img src="' + src + '"/>';
    return $(img);
}