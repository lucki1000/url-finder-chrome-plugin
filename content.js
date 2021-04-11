// content.js

//alert("HI")
let markup = document.documentElement.innerHTML;
let str = new RegExp("(http|https):\\/\\/vivo.sx\\/..........", "g");
let result = markup.match(str);
if (result.length != 0)
    alert(result)
    console.log(result)
