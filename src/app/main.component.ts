import html from "./main.component.html";
import css from "./main.component.css";
import { WebzComponent } from "@boots-edu/webz";
import { PixelComponent } from "./pixel/pixel.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { Color } from "./color";

/**
 * @description MainComponent is the main component of the app
 * @extends WebzComponent
 *
 */
export class MainComponent extends WebzComponent {
    constructor() {
        super(html, css);
        let toolbar = new ToolbarComponent();
        this.addComponent(toolbar);
        let testPixel = new PixelComponent(0, 0);
        testPixel.setColor(new Color(255, 0, 0)); // Red
        testPixel.setSize(50); // 50px by 50px
        this.addComponent(testPixel);
    }
}
