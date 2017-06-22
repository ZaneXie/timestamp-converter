function find(node, regex, tag_name, class_name) {
    var skip = 0;

    if (node.nodeType === Node.TEXT_NODE) {
        var data = node.data;
        var pos = data.search(regex);
        if (pos >= 0 && data.length > 0) {
            if (node.parentNode.tagName.toLowerCase() === 'textarea') return 0;

            var spanNode = document.createElement(tag_name);
            spanNode.className = class_name;

            spanNode.title = (new Date(parseInt(data))).toLocaleString();
            var parent = node.parentNode;
            // @todo: add config to switch replace or hover
            spanNode.innerHTML = spanNode.title;
            // spanNode.appendChild(node.cloneNode(true));
            parent.replaceChild(spanNode, node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.className !== class_name
        && node.childNodes && !/(script|style)/i.test(node.tagName)) { // 1 - Element node
        $.each(node.childNodes, function (key, value) {
            find(value, regex, tag_name, class_name);
        })
    }
    return skip;
}

function findAndConvert() {
    var tag = 'span';
    var class_identifier = 'xmd-timestamp';

    var regex = '1[0-9]{12,12}';
    var regex_object = new RegExp(regex);

    $("body").each(function () {
        find(this, regex_object, tag, class_identifier);
    });
    $('body').on('DOMNodeInserted', function () {
        find(this, regex_object, tag, class_identifier);
    });
}
$(function () {
    findAndConvert();
});

