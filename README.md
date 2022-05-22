# Software Studio 2022 Spring Assignment 2

### Scoring

|**Basic Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Membership Mechanism|10%|Y|
|Complete Game Process|5%|Y|
|Basic Rules|45%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

|**Advanced Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Leaderboard|5%|Y|
|Offline multi-player game|5%|Y|
|Online multi-player game|15%|Y|
|Others [name of functions]|1-15%|Y|

---
First Stage:
![image](https://user-images.githubusercontent.com/39045469/169699332-ec4c3bc3-f01c-44d5-a00f-47a07dec00c0.png)


Menu:
![image](https://user-images.githubusercontent.com/39045469/169699261-b0ae854a-4b9f-4daa-aef8-53dbac16a643.png)

Login:
![image](https://user-images.githubusercontent.com/39045469/169699303-e8ca0dde-0f81-4521-bbd0-bceada259f0d.png)



https://user-images.githubusercontent.com/39045469/169699357-3c876656-3a2b-4df8-9b42-bbdd1841db4b.mp4


## Basic Components Description : 
1. World map : There are two maps. The first map is a tutorial with basic instructions. The second one is a normal map with a hidden ending. The camera moves with the player and goes smoothly. The background will move according to the player's position and it moves relatively slow so that the scene would appear to be 3D.

2. Player : The player has normal physics properties. They can move with arrow keys and and jump with up arrow or space. The player will die and respawn when getting hit by enemies or fall down holes on the map. Holding left or right key beside a wall will make the player cling on to the wall. The respawn location will be on the right of the death location so that the player won't fall in a dying loop when touching a stationery enemy (die -> respawn on enemy ->die)

3. Enemies : There are two types of enemies. The first one is Goomba that moves between two coordinates. The other is Kroopa Troopa(Turtle) that will turn into a shell when killed. The shell will be running when hit from top-right or top-left.

4. Question Blocks : One type of the question blocks will generate coin(score) when hit from below. The other type is invisible block that only appears when hit from below.

5. Animations : There are walk and jump animation for player. Furthermore, there are animation for Goomba's death, Turtle's walk, Turtle's death, Shell's run, and questoin blocks.

6. Sound effects : Three different BGMs for menu and two stages. Sound effects for player's jump, die. Additional sound effects include player's walk, question block's coin, invisible block's appearance, Goomba's death, and Mario's 'yahoo!' when finishing a stage.

7. UI : Player's lives and score will show on screen and is written and read from firebase if logged in. Timer is on top right of the screen.

## Advanced Component Description : 

There's an hidden ending in stage 2. The player will have to hit all invisible blocks correctly in order to get there.

# Firebase page link

    https://mario-bf61e.web.app/
