import { WebzComponent, BindStyleToNumberAppendPx } from "@boots-edu/webz";
import { Color } from "../color";
import html from "./grid.component.html";
import css from "./grid.component.css";
import { PixelComponent } from "../pixel/pixel.component";

export class GridComponent extends WebzComponent {
    @BindStyleToNumberAppendPx("pixel", "width")
    @BindStyleToNumberAppendPx("pixel", "height")
    private gap: number;
    private zoom: number;
    private size: number;
    private pixels: PixelComponent[][] = [[]];

    constructor(_gap: number, _zoom: number) {
        super(html, css);
        this.gap = _gap;
        this.zoom = _zoom;
        this.size = 0;
    }

    private addPixel(x: number, y: number, color: Color): PixelComponent {
        let temp = new PixelComponent(x, y);
        temp.setSize(this.zoom);
        temp.setColor(color);
        if (!this.pixels[y]) {
            this.pixels[y] = [];
        }
        this.pixels[y][x] = temp;
        this.addComponent(temp);
        return temp;
    }

    public loadImage(input: Color[][]): void {
        this.pixels = [];
        for (let i: number = 0; i < input.length; i++) {
            let inputRow: PixelComponent[] = [];
            this.pixels[i] = inputRow;
            for (let j: number = 0; j < input[i].length; j++) {
                let pixel = this.addPixel(j, i, input[i][j]);
                inputRow.push(pixel);
            }
        }
        let rows = input.length;
        this.size = rows * (this.zoom + this.gap) - this.gap;
    }
}
