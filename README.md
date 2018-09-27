# Basic Platformer
**Simple game core for 2d platformer**

## Features
* Support Tiled
* Animation Controller
* Simple Scene manager
* Basic Camera
* Entities behavior management
* Simple collision detection
* Adaptive screen
* Mobile gamepad

## Structure
* **managers**<br>
All managers classes for game

* **objects**<br>
All entities and individual classes for TiledMap

* **scenes**<br>
All scenes for ScenesManager

* **utils**<br>
Utilities functions for game

## Tiled Specification
**Properties:**
* **background: image_name**
* **gravity: 1**

**Properties layer**
* **paralax: 1**

## Areas Rectangles
* **Solid**<br>

* **SlopeRight and slopeLeft**<br>

* **Ladder**<br>

* **CameraZoom**<br>

* **Thorns**<br> Collision trigger for dead entity

## Behaviors
* **Player**<br>

* **Slime**<br> Enemy, move left-right

* **Frog**<br> Enemy, jumping left-right

* **Bee**<br> Enemy, flying left-right

* **MovePlatform**<br>
Solid object, moving.<br>
_Properties: moving = 0(left-right), 1(top-bottom)_

* **Box**<br> Solid object, destroy with hit player head, spawn coins

* **Coin**<br>_Properties:<br>score: 1_



## Credits
* **Code by Andrey Zhevlakov**
* **Free game asset by Kenney**
* **LICENSE MIT**
