const keyListener = (event) => {
    if(configKeyboard.LEFT === event.keyCode)
    {
        game.movePieceLeft();
    }
    else if(configKeyboard.RIGHT === event.keyCode)
    {
        game.movePieceRight();
    }
    else if(configKeyboard.DOWN === event.keyCode)
    {
        if (event.preventDefault)
            event.preventDefault();

        game.dropPiece();
    }
    else if(configKeyboard.HOLD === event.keyCode)
    {
        game.holdPiece();
    }
    else if(configKeyboard.PAUSE === event.keyCode)
    {
        game.pause();
    }
    else if(configKeyboard.ROTATE_CLOCKWISE === event.keyCode)
    {
        game.rotatePieceClockwise();
    }
    else if(configKeyboard.ROTATE_COUNTER_CLOCKWISE === event.keyCode)
    {
        game.rotatePieceCounterClockwise();
    }
};

document.addEventListener('keydown', keyListener);