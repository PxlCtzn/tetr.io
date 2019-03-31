function getKey(control_type, key_id)
{
    if(control_type === "keyboard")
    {
        return configKeyboard[key_id];
    }
}

updateControlsDisplay = (control_type) => {
    let controls = [
        {
            "label" : "Move left",
            "id" : "LEFT"
        },
        {
            "label" : "Move right",
            "id" : "RIGHT"
        },
        {
            "label" : "Rotate clockwise",
            "id" : "ROTATE_CLOCKWISE"
        },
        {
            "label" : "Rotate counterclockwise",
            "id" : "ROTATE_COUNTERCLOCKWISE"
        },
    
        {
            "label" : "Hold",
            "id" : "HOLD"
        },
        {
            "label" : "Pause",
            "id" : "PAUSE"
        },
        {
            "label" : "Soft drop",
            "id" : "SOFT_DROP"
        },
        {
            "label" : "Hard drop",
            "id" : "HARD_DROP"
        },
    ];

    let control_list = document.getElementById("control-list");
    // We clear controls display
    control_list.innerHTML = "";

    controls.forEach((control) => {
        let control_item = document.createElement("li");
        control_item.class     = "control-list-item";
        control_item.innerHTML = 
            "<span class='label'>" + control.label + "</span>" +
            "<img src='"+getIcon(getKey(control_type, control.id))+"' class='"+control_type+"--icon'>"
        ;
        control_list.appendChild(control_item);
    });
};

document.getElementById("controller-select").addEventListener('change', (event) => {
    updateControlsDisplay(event.target[event.target.selectedIndex].value);
});

function getIcon(key)
{
    if(key === " ")
    {
        key = "Space";
    }

    if(key.length === 1)
        key = key.toUpperCase();
    
    return "../icons/controls/Keyboard/Light/"+key+".png";
}
updateControlsDisplay('keyboard');

const keyListener = (event) => {
    if (event.preventDefault)
        event.preventDefault();
    if(configKeyboard.LEFT === event.key)
    {
        game.movePieceLeft();
    }
    else if(configKeyboard.RIGHT === event.key)
    {
        game.movePieceRight();
    }
    else if(configKeyboard.SOFT_DROP === event.key)
    {
        game.softDrop();
    }
    else if(configKeyboard.HARD_DROP === event.key)
    {
        game.hardDrop();
    }
    else if(configKeyboard.HOLD === event.key)
    {
        game.holdPiece();
    }
    else if(configKeyboard.PAUSE === event.key)
    {
        game.pauseGame();
    }
    else if(configKeyboard.ROTATE_CLOCKWISE === event.key)
    {
        game.rotatePieceClockwise();
    }
    else if(configKeyboard.ROTATE_COUNTERCLOCKWISE === event.key)
    {
        game.rotatePieceCounterClockwise();
    }
};

document.addEventListener('keydown', keyListener);