import { WebzComponent } from "@boots-edu/webz";
import { BindStyle, BindStyleToNumberAppendPx } from "@boots-edu/webz";
import html from "./pixel.component.html";
import css from "./pixel.component.css";
import { Color } from "./color";

export class PixelComponent extends WebzComponent {
    //private color: Color;
    @BindStyle("pixel", "backgroundColor", (color: Color) => color.toString())
    @BindStyleToNumberAppendPx("pixel", "width", (size: number) =>
        size.toString(),
    )
    @BindStyleToNumberAppendPx("pixel", "height", (size: number) =>
        size.toString(),
    )
    color: Color = new Color(255, 255, 255);
    size: number = 10;
    private x: number;
    private y: number;

    constructor(_x: number, _y: number) {
        super(html, css);
        //this.color = new Color(1, 2, 3);
        //this.size = 10;
        this.x = _x;
        this.y = _y;
    }

    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    getColor(): Color {
        return this.color;
    }
    setColor(input: Color): void {
        this.color = input;
    }
    setSize(input: number): void {
        this.size = input;
    }
}
