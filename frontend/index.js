(function () {

    "use strict";

    let form    = document.querySelector("#formLink")
    let link    = document.querySelector("#inputLink")
    let loading = document.querySelector("[data-loading]")

    form.addEventListener("submit", e => {

        loading.style.display = "flex"

        link = link.value.trim()

        e.preventDefault()

        request(`${location.origin}/scrap`,{link})
            .then(response => JSON.parse(response))
            .then(response => {

                if(response.hasOwnProperty("body")){
                    let span = document.createElement("span")
                    span.style.display = "none"
                    span.innerHTML = response.body

                    loading.style.display = "none"

                    render( formatData(span) )

                }

            })

    })

    const request = (link,params) => {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            let data = JSON.stringify(params);

            xhr.open("POST",link);

            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            xhr.onload = function(){
                resolve(xhr.response)
            }

            xhr.send(data)
        })

    }

    const formatData = html => {

        return {
            links: append( html.querySelectorAll("a"), 'a' ),
            imgs: append( html.querySelectorAll("img"), 'img' )
        }

    }

    const append = (els, tag) => {

        let ul = document.createElement("ul");

        [...els].map(value => {

            let el = document.createElement(tag)

            if(tag === "a"){
                el.innerText = value
                el.href = value
            }
            else if(tag === "img"){
                el = value
            }

            let li = document.createElement("li")

            li.appendChild(el)

            ul.appendChild(li)

        })

        return {
            els: ul,
            count: [...els].length
        }

    }

    const render = obj => {

        Object.keys(obj).forEach(key => {

            let container = document.getElementById(key)
            let span = document.getElementById(`total-${key}`)
            let value = obj[key]

            container.appendChild(value.els)
            span.innerText = value.count

        })

    }

})()