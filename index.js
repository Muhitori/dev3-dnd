(() => {
    const mainDiv = document.querySelector('.main_div');
    const input = document.getElementById('main_input');

    input.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
            input.value
                .split("")
                .forEach(letter => {
                    const div = document.createElement("div");
                    div.innerText = letter;
                    div.classList.add("letter");

                    div.onclick = (e) => {
                        document.onclick = (e) => {
                            makeAllWhite();
                            div.style.backgroundColor = 'yellow';

                            if (div.style.position != 'absolute') {
                                div.style.position = 'absolute';
                                return;
                            }

                            moveAt(e, div);
                            div.onclick = null;
                        }
                    };

                    mainDiv.appendChild(div);
                });
        }
    });

    function moveAt(e, elem) {        
        const collisionElem = getCollisionElem(e.pageX, e.pageY, elem);

        if (collisionElem && collisionElem.style.position == 'absolute') {
            collisionElem.style.left = elem.style.left;
            collisionElem.style.top = elem.style.top;
            elem.style.backgroundColor = 'white';
            collisionElem.style.backgroundColor = 'yellow';

            document.onclick = (e) => {
                moveAt(e, collisionElem);
                collisionElem.onclick = null;
            }
        }

        elem.style.left = e.pageX - elem.offsetWidth / 2 + 'px';
        elem.style.top = e.pageY - elem.offsetHeight / 2 + 'px';
    }

    function getCollisionElem(x, y, elem) {
        return [...document.querySelectorAll(".letter")]
            .filter(letter => letter != elem)
            .find(letter => collision(x, y, letter));
    }

    function collision(x, y, letter) {
        const sizeY = letter.offsetHeight;
        const sizeX = letter.offsetWidth;
        const rect = letter.getBoundingClientRect();
        
        return (rect.top < y && y < rect.top + sizeY) && 
                (rect.left < x && x < rect.left + sizeX);
    }

    function makeAllWhite() {
        [...document.querySelectorAll(".letter")]
        .forEach(letter => {
            if (letter.style.backgroundColor != 'white')
                letter.style.backgroundColor = 'white';
        })
    }
})();