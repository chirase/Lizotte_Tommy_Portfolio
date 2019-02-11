 (function() {
            generateurBandes();
        })()

        function generateurBandes() {
            var elmParent = document.getElementById("background");
            var divAnimation = document.createElement("div");

            divAnimation.style.width = "1px";
            divAnimation.style.height = `${Random(5,10)}%`;
            let a, b, c;
            a = Random(0, 255);
            b = Random(0, 255);
            c = Random(0, 255);
            divAnimation.style.backgroundColor = `rgb(${a},${b},${c})`;

            divAnimation.style.position = "absolute";
            divAnimation.style.left = `${Random(0,window.innerWidth)}px`
            divAnimation.style.bottom = `${Random(window.innerHeight,0)}px`
            divAnimation.classList.add("itemBack");

            divAnimation.addEventListener("animationend", function(evt) {
                elmParent.removeChild(elmParent.firstChild)
            })

            elmParent.appendChild(divAnimation);
            setTimeout(generateurBandes, Random(5, 10));


        }


        function Random(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        };