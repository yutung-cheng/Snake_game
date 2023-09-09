// Food Class.
export default class Food {
  // Declare an element to represent food's HTML element.
  element: HTMLElement = document.getElementById("food")!; // ! means this element will never be null.

  // Get Food's X position method.
  get x() {
    return this.element.offsetLeft; // X position for Food.
  }

  // Get Food's Y position method.
  get y() {
    return this.element.offsetTop; // Y position for Food.
  }

  // Change the Food's position.
  changePosition() {
    /// Create a random position for next food position...
    /// Food position minimum 0, maximum 290.
    /// Snake size is 10px, so every move will change 10px.
    /// This means that Food position must set to 10*n.
    let left = Math.round(Math.random() * 29) * 10; // Range '0-29' times 10.
    let top = Math.round(Math.random() * 29) * 10; // Range '0-29' times 10.
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
}
