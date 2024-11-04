import { WebzComponent } from "@boots-edu/webz";
import { Color, makeColor, PALETTE } from "../color";
import { PixelComponent } from "../pixel/pixel.component";
import { ClickablePixelComponent } from "../pixel/clickable-pixel.component";
import html from "./toolbar.component.html";
import css from "./toolbar.component.css";

export const DEFAULT_COLOR: Color = makeColor(0);

export class ToolbarComponent extends WebzComponent {
    private active: PixelComponent = new PixelComponent(0, 0);
    private swatches: PixelComponent[] = [];
    constructor() {
        super(html, css);
        this.active.setSize(30);
        this.active.setColor(DEFAULT_COLOR);
        this.addComponent(this.active);
        for (let i = 0; i < PALETTE.length; i++) {
            let swatch = new ClickablePixelComponent(0, i);
            swatch.clickEvent.subscribe((swatch: ClickablePixelComponent) => {
                this.active.setColor(swatch.getColor());
            });
        }
    }
    getActiveColor(): Color {
        return this.active.getColor();
    }
}
