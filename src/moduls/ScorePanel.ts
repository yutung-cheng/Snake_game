//Score Panel class

export default class ScorePanel {
  private scoreElement: HTMLElement = document.getElementById("score")!;
  private levelElement: HTMLElement = document.getElementById("level")!;
  public score: number = 0;
  public level: number = 1;
  private maxLevel: number = 10;
  private levelShouldUpScore = 10; //Every 10 score will level up once. Max level us `maxLevel` variable.

  //change score
  addScore(): void {
    this.scoreElement.innerHTML = (++this.score).toString(); //innerHTML should be a string.
    //Check the score, and decide if we need to level up.
    if (this.score % this.levelShouldUpScore === 0) {
      // If the score is 10*n, we should level up.
      this.levelUp();
    }
  }

  //change level. Maximum 10.
  levelUp(): void {
    if (this.level < this.maxLevel) {
      this.levelElement.innerHTML = (++this.level).toString();
    }
  }
}
