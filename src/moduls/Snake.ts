// Snake class
export default class Snake {
  //Snake Container Element.
  private snakeContainerElement: HTMLElement =
    document.getElementById("snake-container")!;
  //Snake Head - it leads the body.
  private headElement: HTMLElement = document.getElementById("snake-style")!; // This will never be null.
  //Snake Body includes `headElement`.
  private bodyElement: HTMLCollection =
    this.snakeContainerElement.getElementsByTagName("div")!;
  public snakeAllPositionX: number[] = [];
  public snakeAllPositionY: number[] = [];
  //Setter - snake head X position.
  set snakeX(value: number) {
    // If the previous value is the same as current value. We don't need to change snakeX.
    if (this.snakeX === value) return;
    //Out of boundary version
    else if (value < 0 || value > 290) {
      // Alert player this game is over....
      throw new Error("Game Over");
    }

    if (
      this.bodyElement[1] &&
      (this.bodyElement[1] as HTMLElement).offsetLeft === value
    ) {
      value = this.checkMoveBack(value, this.snakeX);
    }

    //Move body
    this.moveBody();
    //New head position.
    this.headElement.style.left = `${value}px`;
    //Check bite body
    this.checkIfBiteBody();
  }
  //Getter - snake head X position.
  get snakeX() {
    return this.headElement.offsetLeft;
  }

  //Setter - snake head Y position.
  set snakeY(value: number) {
    // If the previous value is the same as current value. We don't need to change snakeX.
    if (this.snakeY === value) return;
    // Out of boundary Version
    else if (value < 0 || value > 290) {
      // Alert player this game is over....
      throw new Error("Game Over");
    }

    if (
      this.bodyElement[1] &&
      (this.bodyElement[1] as HTMLElement).offsetTop === value
    ) {
      value = this.checkMoveBack(value, this.snakeY);
    }

    //Move body
    this.moveBody();
    //New head position.
    this.headElement.style.top = `${value}px`;
    //Check bite body
    this.checkIfBiteBody();
  }
  //Getter - snake head Y position.
  get snakeY() {
    return this.headElement.offsetTop;
  }

  //Snake increase body length.
  snakeGrow() {
    // Add a <div>
    this.snakeContainerElement.insertAdjacentHTML(
      "beforeend",
      "<div id='snake-style'></div>"
    );
  }

  // Move Body method.
  moveBody() {
    // Loop all the body elements we had.
    for (let i = this.bodyElement.length - 1; i > 0; i--) {
      // Get previous body location.
      let X = (this.bodyElement[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodyElement[i - 1] as HTMLElement).offsetTop;
      // Set the previous position to current body element's X/Y position.
      (this.bodyElement[i] as HTMLElement).style.left = `${X}px`;
      (this.bodyElement[i] as HTMLElement).style.top = `${Y}px`;
    }
  }

  //Check if the snake goes backward.
  checkMoveBack(value: number, currentOffset: number): number {
    // If goes back, keep the snake move forward.
    if (value > currentOffset) {
      // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
      value = currentOffset - 10;
    } else {
      // 向左走
      value = currentOffset + 10;
    }
    return value;
  }

  // Check if the snake bites itself.
  checkIfBiteBody() {
    // Get all the body elements, check if head position is the same as body elements' position.
    for (let i = 1; i < this.bodyElement.length; i++) {
      let bd = this.bodyElement[i] as HTMLElement;
      this.snakeAllPositionX.push(bd.offsetLeft);
      this.snakeAllPositionY.push(bd.offsetTop);
      if (this.snakeX === bd.offsetLeft && this.snakeY === bd.offsetTop) {
        // Check if it's the same position, if true, throw an error and Game over.
        throw new Error("Game Over");
      }
    }
  }
}
