# Tetr.io

## Mode

 * Single player
 * Multiplayer
    * Deathmatch
    * Team Deathmatch
        * Team of 2 or 3 players (you can create a Team Deathmatch for bigger team on custom mode)

 * Join custom multiplayer game.

 * Custom
    * Could be either Single player or Multiplayer. On either case after setting up the parameter you can generate and download a setting file. This file can be use to reload the setting next time. Warning, a single player setting file can not be use in a multiplayer custom lobby.
        * If Single player the player goes to the solo mod and the game settings are customizable on the go.
        * If Multiplayer Then the player configure his/her game before starting the server.

## Single player/Marathon 
This is the classic experience (i.e: Marathon mode). No JS server needed, just the good old Web Browser running a classic game.

### Settings :
* Board
    * column : 10
    * row : 22
* hold piece : yes
* scoring: yes
* combo : yes
* preview : yes
* number of next piece visible : 3
* pieces : All
* initial speed : 0.01667 G
* top speed : 2.36G
* speed formula : Time = (0.8-((Level-1)*0.007))<sup>(Level-1)</sup>
* winning condition : None
* loosing condition : 
    * spawning piece over another one;
    * a piece locks completely above the board;
    * a piece is push above the top of the board.
* pause available : yes
* series generator : random
* lock delay: 0.5sec (when speed < 20 G)
* t-spin rules : 3 corner method
* t-spin mini rules : pointing side cell method

Well... Basically here we follow the [Tetris Guideline](https://tetris.wiki/Tetris_Guideline)

## Multiplayer