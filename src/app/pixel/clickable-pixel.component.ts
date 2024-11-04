import { PixelComponent } from "./pixel.component";
import { Click, Notifier } from "@boots-edu/webz";

export class ClickablePixelComponent extends PixelComponent {
    clickEvent: Notifier<ClickablePixelComponent> = new Notifier();

    constructor(x: number, y: number) {
        super(x, y);
    }

    @Click("pixel")
    onClick() {
        this.clickEvent.notify(this);
    }
}
