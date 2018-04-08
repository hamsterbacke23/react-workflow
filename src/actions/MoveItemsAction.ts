import { BaseAction } from './BaseAction';

export class MoveItemsAction extends BaseAction {
  moved: boolean;

  constructor(mouseX: number, mouseY: number) {
    super(mouseX, mouseY);
    this.moved = false;
  }
}
