var
    i, picked_color,
    numOfSquares = 6;
colors = [],
    squares = document.querySelectorAll('.square'),
    color_display = document.getElementById('color-display')
message_display = document.querySelector('#message'),
    h1 = document.querySelector('h1'),
    reset_button = document.querySelector('#reset'),
    mode_buttons = document.querySelectorAll('.mode')
    ;

init();

function init() {
    modeButtonListeners();
    setupSquares();
    reset();
}

function modeButtonListeners() {
    // mode button listeners
    for (i = 0; i < mode_buttons.length; i++) {
        mode_buttons[i].addEventListener('click', function () {
            mode_buttons[0].classList.remove('selected');
            mode_buttons[1].classList.remove('selected');
            this.classList.add('selected');

            this.textContent === 'Easy' ? numOfSquares = 3 : numOfSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for (i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            // grab color & compare to picked color
            var clicked_color = this.style.backgroundColor;

            if (clicked_color === picked_color) {
                message_display.textContent = 'Correct!';
                reset_button.textContent = 'Play Again?';

                setWinColors(clicked_color);
            } else {
                this.style.backgroundColor = '#232323';
                message_display.textContent = 'Try Again';
            }
        });
    }
}

function reset() {
    colors = generateRandomColorsArray(numOfSquares);
    picked_color = pickRandomColor();
    color_display.textContent = picked_color;
    h1.style.backgroundColor = 'steelblue';
    message_display.textContent = '';
    reset_button.textContent = 'New Colors';

    for (i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
}


reset_button.addEventListener('click', function () {
    reset();
});


function setWinColors(color) {
    squares.forEach(function (element) {
        element.style.backgroundColor = color;
    }, this);

    h1.style.backgroundColor = color;
}

function pickRandomColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColorsArray(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push(generateRandomColor());
    }

    return arr;
}

function generateRandomColor() {
    var
        red = Math.floor(Math.random() * 256),
        green = Math.floor(Math.random() * 256),
        blue = Math.floor(Math.random() * 256)
        ;

    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}