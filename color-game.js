var
    rgbGame = (function () {

        var 
            i, pickedColor, 
            numOfSquares    = 6;
            color_list      = [],
            squares         = document.querySelectorAll( '.square' ),
            colorDisplay    = document.getElementById( 'color-display' )
            messageDisplay  = document.querySelector( '#message' ),
            h1              = document.querySelector( 'h1' ),
            reset_button    = document.querySelector( '#reset' ),
            mode_buttons    = document.querySelectorAll( '.mode' )
        ;

        function init() {
            onClickModeButton();
            onClickSquares();
            fnReset();
        }


        function onClickModeButton() {
            // mode button listeners
            for (i = 0; i < mode_buttons.length; i++) {
                mode_buttons[i].addEventListener( 'click', function () {
                    mode_buttons[0].classList.remove( 'selected' );
                    mode_buttons[1].classList.remove( 'selected' );
                    this.classList.add( 'selected' );

                    this.textContent === 'Easy' ? numOfSquares = 3 : numOfSquares = 6;
                    fnReset();
                });
            }
        }

        function onClickSquares() {
            for( i = 0; i < squares.length; i++ ) {
                squares[ i ].addEventListener("click", function () {
                    // grab color & compare to picked color
                    var clicked_color = this.style.backgroundColor;

                    if ( clicked_color === pickedColor ) {
                        messageDisplay.textContent = 'Correct!';
                        reset_button.textContent   = 'Play Again?';

                        setWinColors( clicked_color );
                    } else {
                        this.style.backgroundColor = '#232323';
                        messageDisplay.textContent = 'Try Again';
                    }
                });
            }
        }

        function fnReset(){
            color_list                 = generateRandomColorsArray( numOfSquares );
            pickedColor                = pickRandomColor();
            colorDisplay.textContent   = pickedColor;
            h1.style.backgroundColor   = 'steelblue';
            messageDisplay.textContent = '';
            reset_button.textContent   = 'New Colors';

            for ( i = 0; i < squares.length; i++ ) {
                if ( color_list[ i ] ) {
                    squares[ i ].style.display         = 'block';
                    squares[ i ].style.backgroundColor = color_list[ i ];
                } else {
                    squares[ i ].style.display = 'none';
                }
            }
        }


        reset_button.addEventListener( 'click', function(){
            fnReset();
        });


        function setWinColors( color ) {
            squares.forEach( function( element ) {
                element.style.backgroundColor = color;
            }, this);

            h1.style.backgroundColor = color;
        }

        function pickRandomColor() {
            var random = Math.floor( Math.random() * color_list.length );
            return color_list[ random ];
        }

        function generateRandomColorsArray( num ) {
            var arr = [];

            for ( var i = 0; i < num; i++ ) {
                arr.push( generateRandomColor() );
            }

            return arr;
        }

        function generateRandomColor() {
            var
                red   = Math.floor( Math.random() * 256 ),
                green = Math.floor( Math.random() * 256 ),
                blue  = Math.floor( Math.random() * 256 )
            ;

            return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        }

        return { init : init};
    })()
;

rgbGame.init();