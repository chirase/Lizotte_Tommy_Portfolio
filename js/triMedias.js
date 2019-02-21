 (function () {
     for (let e of document.querySelectorAll("input[type='checkbox']")) {
         e.addEventListener("change", function () {
             if (e.parentElement.classList.contains("boutonCocher")) {
                 e.parentElement.classList.remove("boutonCocher")
                 e.parentElement.classList.add("boutonDecocher")

             } else if (e.parentElement.classList.contains("boutonDecocher")) {
                 e.parentElement.classList.add("boutonCocher")
                 e.parentElement.classList.remove("boutonDecocher")

             }
             for (let i of document.querySelectorAll(`div[class=${e.value}]`)) {
                 i.style.display = (e.checked) ? "flex" : "none";
             }


         });
     }
 })()
