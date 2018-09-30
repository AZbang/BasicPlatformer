# Basic Platformer
Simple game core for 2d platform on pixi.js without unnecessary dependencies

![preview](preview.gif)
## Software
* Tiled (Developing levels for the game)
* ShoeBox (packing resources into one tile set)

## Features
* Tiled
* Animation Controller
* Simple Scene manager
* Basic Camera
* Entities behavior management
* Simple collision detection
* Adaptive screen

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
Supports objectgroup layers, rotation and opacity of the sprites. Tileset supports animation frames and objectgroup.

Tiled's animation of tiles works for simple game sprites, for objects with behavior, the animation is configured manually.

The first rectangle in the object group of the tile will be processed as a physical body of the object-sprites with the type `entity` for handling collisions.

Objects rectangles with the type `area` are processed by objects-sprites of the type `entity` for collisions with triggers and rigid static bodies.

An object with the type `entity` is assigned a specific behavior from the group of classes `objects/index`.

Objects with the type `area` or `entity` can have custom properties, which are listed below in the documentation.

**Properties map:**
* **background: image_name**<br>
Custom background for current level map.

* **gravity: 1**<br>
Acceleration of gravity for objects of type `entity`.

## Areas Rectangles
* **Solid**<br>
Adjusts the position of objects of the `entity` type with respect to the solid area (Only with` entity.isSolid = true`, the default value)

* **SlopeRight and slopeLeft**<br>
Adjusts the position of objects of the `entity` type relative to the curved surface (Only with` entity.isSolid = true`, default value)

* **CameraZoom**<br>
A trigger that handles a Player to control camera zoom.<br>
> **Properties:**<br>
zoom = 1 (default)

* **Dead**<br> Collision trigger to kill entity

* **Exit**<br> Collision trigger to complete the level

## Behaviors
* **Player**<br>

* **Slime**<br> A little slime moves right and left on ground. Kills the player<br>
> **Properties:**<br>
path: 3 (the number of tiles that an enemy can pass in one direction)<br>
dir: -1 (start direction enemy)<br>
speed: 4

* **Bee**<br> A little bee flies right and left in the air, swaying along a sine wave. Kills the player
> **Properties:**<br>
path: 3 (the number of tiles that an enemy can pass in one direction)<br>
dir: -1<br>
speed: 4


* **Coin**<br>Coins that the player collects
> **Properties:**<br>
score: 10 (default)

* **Jumper**<br>
Sets the negative vector in Y coordinate for Player
> **Properties:**<br>
zoom = 1 (default)

## Credits
* **Code by Andrey Zhevlakov**
* **Free game asset by Kenney**
* **LICENSE MIT**
