(function() {
            document.getElementById("stop").addEventListener("click", function(){
                if (document.getElementById("lecteur").style.display != "none"){
                document.getElementById("lecteur").style.display = "none";
                    
                    document.getElementById("lecteur").querySelector("iframe").setAttribute("src", "")
                }
            })
            
            for (let i of document.querySelectorAll("div[class='Programmation']")) {
                i.addEventListener("click", function(){
                    if (document.getElementById("lecteur").style.display == "none"){
                        document.getElementById("lecteur").style.display = "block"
                        document.getElementById("lecteur").querySelector("iframe").setAttribute("src", i.dataset.src)
                    }
                })


            }
        })()