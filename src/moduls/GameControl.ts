import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// Enums for keydown event keys.
export enum Direction {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}

// Filter out enum Direction values as a string array.
const directionStrings: (string | Direction)[] = Object.values(
  Direction
).filter((v) => isNaN(Number(v)));

//Create GameControl - Control everything in the Game.
export default class GameControl {
  stageElemet: HTMLElement = document.getElementById("stage-container")!;
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  //Store the keydown value (which is also the direction that snake should move next.)
  direction: string = "ArrowDown";
  isAlive: boolean = true; // Check if the snake is alive.
  _isPause: boolean = false; // Check if the user pause the game.

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init(); //Game starts when we create a new instance of GameControl in index.ts file.
  }

  set setPause(status: boolean) {
    this._isPause = status;
  }

  get isPause() {
    return this._isPause;
  }

  // Create Pause div element
  createPauseElement(message: string = "PAUSE") {
    this.stageElemet.insertAdjacentHTML(
      "beforeend",
      `<div id='pause'> ${message} </div>`
    );
  }

  //Remove Pause element
  removePauseElement() {
    document.getElementById("pause")?.remove();
  }

  // Create a handler for keydown event.
  keydownHandler(event: KeyboardEvent) {
    const clickButtonCode: string = event.code;

    //Check if the player clicks on the correct buttons. (Up, Down, Left, Right)
    if (!this.isPause && directionStrings.includes(clickButtonCode)) {
      this.direction = clickButtonCode;
    } else if (!this.isPause && clickButtonCode === "Space") {
      //Pause
      this.setPause = true;
      this.createPauseElement();
    } else if (this.isPause && clickButtonCode === "Space") {
      //Continue
      this.setPause = false;
      this.removePauseElement(); //Keep moving
      this.move();
    }
  }

  // Game Start initialize method. If we call this function, the game will start.
  init() {
    //The `keydownHandler` original `this` point to #document. (Becuse we call `keydownHandler` in line 42, and we call it through document.addEventListener.)
    //Therefore, we have to bind(this) so it will point to
    const newThisKeydownHandler: (event: KeyboardEvent) => void =
      this.keydownHandler.bind(this);

    //Snake starts to move once we click button.
    document.addEventListener("keydown", newThisKeydownHandler);
    this.move(); //Call move.
  }

  // According to `this.direction` changes snake's movement.
  move() {
    /*
     *   ArrowTop - top decrease
     *   ArrowDown - top increase
     *   ArrowLeft - left decrease
     *   ArrowRight - left increase
     */

    const { snakeX, snakeY } = this.snake;
    //Get current snake X/Y position.
    let currentSnakeX = snakeX;
    let currentSankeY = snakeY;

    switch (this.direction) {
      case Direction.ArrowUp:
        currentSankeY -= 10;
        break;
      case Direction.ArrowDown:
        currentSankeY += 10;
        break;
      case Direction.ArrowLeft:
        currentSnakeX -= 10;
        break;
      case Direction.ArrowRight:
        currentSnakeX += 10;
        break;
    }

    //Check if the snake eats the food.
    this.checkEat(snakeX, snakeY);

    try {
      // Start to move...
      this.snake.snakeX = currentSnakeX;
      this.snake.snakeY = currentSankeY;
    } catch (e: any) {
      // When we need to catch error, it means something wrong and Game over.
      // Alert a message.
      alert(`${e.message}! Your Score: ${this.scorePanel.score}`);
      this.isAlive = false;
    }

    // If snake is alive...
    // Every XXX seconds run `this.move` so this snake will move continuously.
    // Every level will decrease 30 speed. Maximum speed is 30.
    setTimeout(this.move.bind(this), 200 - (this.scorePanel.level - 1) * 20);
  }

  // Check if Snake got the food... if yes, do something more...
  checkEat(snakeX: number, snakeY: number) {
    const indexOfX: number = this.snake.snakeAllPositionX.indexOf(this.food.x);
    const indexOfY: number = this.snake.snakeAllPositionY.indexOf(this.food.y);
    const bodyEat: boolean =
      indexOfX !== -1 && indexOfY !== -1 && indexOfX === indexOfY;
    const checkBothX: boolean = snakeX === this.food.x;
    const checkBothY: boolean = snakeY === this.food.y;

    if ((checkBothX && checkBothY) || bodyEat) {
      // reset the food position.
      this.food.changePosition();
      // add score
      this.scorePanel.addScore();
      // Snake grows
      this.snake.snakeGrow();
    }
  }
}
