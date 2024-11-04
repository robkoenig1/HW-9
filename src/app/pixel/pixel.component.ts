import { WebzComponent } from "@boots-edu/webz";
import html from "./pixel.component.html";
import css from "./pixel.component.css";
import { Color } from "./color.ts";

export class PixelComponent extends WebzComponent {
    private color: Color;
    private size: number;
    private x: number;
    private y: number;

    constructor(_x: number, _y: number) {
        super(html, css);
        this.color = new Color(1, 2, 3);
        this.size = 10;
        this.x = _x;
        this.y = _y;
    }
}
