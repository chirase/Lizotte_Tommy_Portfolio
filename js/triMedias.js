 (function() {
            for (let e of document.querySelectorAll("input[type='checkbox']")) {
                e.addEventListener("change", function() {

                    for (let i of document.querySelectorAll(`div[class=${e.value}]`)) {
                        i.style.display = (e.checked) ? "flex" : "none";
                    }


                });
            }
        })()