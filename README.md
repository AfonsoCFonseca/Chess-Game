# Chess
A classic chess game using phaser and TypeScript

<!-- <p align="center">
  <img src='https://github.com/AfonsoCFonseca/DoubleRoad-Game/blob/master/screenshots/logo.png'>
</p> -->


---------------------------------------------------------------
# Structure

The Game is Based in 3 main pillars, the Board class, the Player/Enemy class and all the Pieces class

### Pieces ###
Exists a main class named Piece who got every configuration common to every game Piece. This class is extended in each
specific piece. Each Piece got his own logic and is responsible for understanding which possible moves or "eats" is 
possible to do in the current turn

### Player/Enemy ###
The Player class manages the turn logic and piece removable. The Enemy class should be responsible of carrying all the 
AI necessary to make challenging oposite enemy

### Board ###
The Board takes mainly every game manage logic. The map is based in a 2D array of strings representing each position on 
the board, where an empty string represents a empty Tile and a specific string, like "wk" ( white king ) represents the 
piece in the current house

### Tile ###
The tile renders his current situation and manages the clicking action of the user

### Game History ###
The history was implemented to help with the debugging development and to give some features for the user to analyse his 
current situation. This class stores every turn in an array of 2D array and can return any undo or redo action

---------------------------------------------------------------
# Development
I started developing this game by creating an 2D array to represent the tile and based on the current index draw the Tile.
After, I inserted strings in the array representing each piece and rendered into the game. The player and the enenmy was made
with similiar structures but only the player could click the board during his turn. The first piece that I started developing 
was the pawn, one of the more complex pieces, when clicked the piece must show the possible moves and if clicked in the possible
Tile, should move to that position

# Future Implementation
Implent an AI based on an external API

---------------------------------------------------------------
# Scratches & Evolution

 <!-- <p float="left">
   <img width="186" height="235" src='https://github.com/AfonsoCFonseca/DoubleRoad-Game/blob/master/screenshots/30_05.png' >
   <img width="186" height="235" src='https://github.com/AfonsoCFonseca/DoubleRoad-Game/blob/master/screenshots/30_05_part2.png' >
   <img width="186" height="235" src='https://github.com/AfonsoCFonseca/DoubleRoad-Game/blob/master/screenshots/20_06.png' >
   <img width="146" height="235" src='https://github.com/AfonsoCFonseca/DoubleRoad-Game/blob/master/screenshots/03_07.png' >
 </p> -->
