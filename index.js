(() => {
    const mainDiv = document.querySelector('.main_div');
    const input = document.getElementById('main_input');
    let coordsArr = [];

    input.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
            input.value
                .split("")
                .forEach(letter => {
                    let div = document.createElement("div");
                    div.innerText = letter;
                    div.classList.add("letter");
                    div.draggable = false;

                    div.onclick = (e) => {
                        makeDraggableRed();
                        div.style.backgroundColor = 'yellow';

                        if (div.style.position != 'absolute') {
                            div.style.position = 'absolute';
                        }

                        coordsArr.push({
                            x: div.style.left,
                            y: div.style.top
                        });

                        toggleDrag(div);
                    };
                    mainDiv.appendChild(div);
                });
        }
    });

    document.onclick = (e) => {
        const div = document.elementFromPoint(e.pageX, e.pageY);

        if (div === input || div === mainDiv){
            return;
        }

        const collisionElem = getCollisionElem(div);

        if (collisionElem && collisionElem.style.position == 'absolute') {
            collisionElem.style.left = coordsArr[coordsArr.length - 2].x;
            collisionElem.style.top = coordsArr[coordsArr.length - 2].y;
        }

    }

    function toggleDrag(div) {
        if (!document.onmousemove) {
            document.onmousemove = (e) => {
                moveAt(e, div);
            }
        } else {
            document.onmousemove = null;
            makeDraggableRed();
        }
    }

    function moveAt(e, elem) {      
        elem.style.left = e.pageX - elem.offsetWidth / 2 + 'px';
        elem.style.top = e.pageY - elem.offsetHeight / 2 + 'px';
    }

    function getCollisionElem(elem) {
        const rect = elem.getBoundingClientRect();

        const x = rect.top + window.scrollX;
        const y = rect.left + window.scrollY;

        return [...document.querySelectorAll(".letter")]
            .filter(letter => letter != elem)
            .find(letter => isCollide(x, y, letter));
    }

    function isCollide(x, y, letter) {
        const rect = letter.getBoundingClientRect();

        const sizeY = rect.height;
        const sizeX = rect.width;
        const letterX = rect.top + window.scrollX;
        const letterY = rect.left + window.scrollY;
        
        return x < letterX + sizeX && x + sizeX > letterX &&
                y < letterY + sizeY && y + sizeY > letterY;
    }

    function makeDraggableRed() {
        [...document.querySelectorAll(".letter")]
        .forEach(letter => {
            if (letter.style.backgroundColor != 'red' && letter.style.position == 'absolute')
                letter.style.backgroundColor = 'red';
        });
    }
})();