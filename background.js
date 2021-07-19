function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.CDATA_SECTION_NODE:
                html += '<![CDATA[' + node.nodeValue + ']]>';
                break;
            case Node.COMMENT_NODE:
                html += '<!--' + node.nodeValue + '-->';
                break;
            case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
                break;
        }
        node = node.nextSibling;
    }
    let str = new RegExp("(http|https):\\/\\/vivo.sx\\/..........", "g"); //Replace this link with your RegEx
    let result = html.match(str); //test
    if (localStorage.getItem('save_to_storage') === null){
        localStorage.setItem('save_to_storage', JSON.stringify(result));
    } else{
        function appendToStorage(name, data) {
            var old = JSON.parse(localStorage.getItem(name)||[]);
            localStorage.setItem(name, JSON.stringify(old.concat(data)));
        }
        appendToStorage('save_to_storage', result);
    }
    result = JSON.parse(localStorage.getItem('save_to_storage'));
    return result;

}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
