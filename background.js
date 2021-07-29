function myFunction(){
    localStorage.removeItem('save_to_storage');
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', myFunction);
});

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
    let str = new RegExp("(http|https):\\/\\/vivo...\\/..........", "g"); //Replace this link with your RegEx
    let result = html.match(str); //test
    //let formatted_result;
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
    var uniq = result.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
    return uniq.toString().split(',').join("\n");
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
