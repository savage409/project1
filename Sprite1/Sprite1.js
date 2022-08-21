/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 34.88663967611339,
        y: 45.99999999999997
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "down arrow" },
        this.whenKeyDownArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "right arrow" },
        this.whenKeyRightArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "left arrow" },
        this.whenKeyLeftArrowPressed
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "any" }, this.whenKeyAnyPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "any" }, this.whenKeyAnyPressed2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.wall = 3749931;

    this.watchers.wall = new Watcher({
      label: "Sprite1: wall",
      style: "normal",
      visible: true,
      value: () => this.vars.wall,
      x: 245,
      y: 175
    });
  }

  *whenKeyUpArrowPressed() {
    while (true) {
      if (this.keyPressed("up arrow")) {
        this.direction = 0;
        this.move(6);
        if (this.touching("edge")) {
          this.direction = 180;
          this.move(90);
        }
      }
      yield;
    }
  }

  *whenKeyDownArrowPressed() {
    while (true) {
      if (this.keyPressed("down arrow")) {
        this.direction = 180;
        this.move(6);
        if (this.touching("edge")) {
          this.direction = 0;
          this.move(90);
        }
      }
      yield;
    }
  }

  *whenKeyRightArrowPressed() {
    while (true) {
      if (this.keyPressed("right arrow")) {
        this.direction = 90;
        this.move(6);
        if (this.touching("edge")) {
          this.direction = -90;
          this.move(90);
        }
      }
      yield;
    }
  }

  *whenKeyLeftArrowPressed() {
    while (true) {
      if (this.keyPressed("left arrow")) {
        this.direction = -90;
        this.move(6);
        if (this.touching("edge")) {
          this.direction = 90;
          this.move(90);
        }
      }
      yield;
    }
  }

  *whenKeyAnyPressed() {
    while (true) {
      if (this.touching("edge")) {
        this.vars.wall += 1;
      }
      yield;
    }
  }

  *whenKeyAnyPressed2() {
    while (true) {
      if (this.vars.wall == 2) {
        yield* this.thinkAndWait(
          "hmm maybe I shouldn't keep hitting the wall",
          30
        );
        yield* this.glide(10, -11, 1);
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    if (this.vars.wall > 1) {
      this.vars.wall = 0;
    }
  }
}
