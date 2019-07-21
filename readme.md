# Tetr.io

## How to install the game using Docker

Type this command inside a Terminal where your Working directory is the Tetr.io directory.

```shell
$ docker build -t pxlctzn/tetr.io .
```
This command will generate an image named *pxlctzn/tetr.io* but feel free to give it the name you want.


### Starting the application container.
***Warning***:
If you are looking for the Developer installation instruction then click right [here](#dev_install)

Now you need to start the container. In this exemple we will name the container *tetr.io*.
```shell
$ docker run -d --name tetr.io -p 8080:80 pxlctzn/tetr.io
```

Before jumping the game, let's explain what just happened.
We started a Docker container named *tetr.io* from the *pxlctzn/tetr.io* image. We also forwarded the port 80 from the container to the 8080 of your computer. The -d option is used to detach the container from the Terminal that you are using to call run this command.

So now you can play as much as you want by going to [localhost:8080](http://localhost:8080).

### Developer installation guide <a href="#dev_install"></a>
Here instead of relying on the source contained inside the image, we want to use the source stored inside the hosting machine (i.e: your computer.).

Run one of these two command to attach the tetr.io directory to the one on the container side.
***By default, the port used is 8080, if you want to use another one just add `-p PORT:80` (where `PORT` is a number) to connect the PORT from the host to the port 80 of the container.

#### Using the -v option
```shell
$ docker run -d \
             --name tetr.io \
             -v "$(pwd)":/usr/local/apache2/htdocs/ \
             pxlctzn/tetr.io
```

With the `-p` option :
```shell
$ docker run -d \
             --name tetr.io \
             -p 8080:80 \
             -v "$(pwd)":/usr/local/apache2/htdocs/ \
             pxlctzn/tetr.io
```
#### Using the --mount option
```shell
$ docker run -d \
             --name tetr.io \
             --mount type=bind,src="$(pwd)",dst=/usr/local/apache2/htdocs/ \
             pxlctzn/tetr.io
```
With the `-p` option :
```shell
$ docker run -d \
             --name tetr.io \
             -p 8080:80 \
             --mount type=bind,src="$(pwd)",dst=/usr/local/apache2/htdocs/ \
             pxlctzn/tetr.io
```
### Stopping the container
To **stop** the container just type:
```shell
$ docker stop tetr.io
```
### Delete the container
If you need to **delete** the container use this command:
```shell
$ docker rm tetr.io
```

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