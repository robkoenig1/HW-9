import {
    WebzComponent,
    BindStyleToNumberAppendPx,
    Notifier,
} from "@boots-edu/webz";
import { Color } from "../color";
import html from "./grid.component.html";
import css from "./grid.component.css";
import { PixelComponent } from "../pixel/pixel.component";
import { ClickablePixelComponent } from "../pixel/clickable-pixel.component";

export class GridComponent extends WebzComponent {
    @BindStyleToNumberAppendPx("pixel", "width")
    @BindStyleToNumberAppendPx("pixel", "height")
    private gap: number;
    private zoom: number;
    private size: number;
    private pixels: PixelComponent[][] = [[]];
    public onPixelClick: Notifier<ClickablePixelComponent>;

    constructor(_gap: number, _zoom: number) {
        super(html, css);
        this.gap = _gap;
        this.zoom = _zoom;
        this.size = 0;
        this.onPixelClick = new Notifier<ClickablePixelComponent>();
    }

    private addPixel(x: number, y: number, color: Color): PixelComponent {
        let temp = new ClickablePixelComponent(x, y);
        temp.setSize(this.zoom);
        temp.setColor(color);
        temp.clickEvent.subscribe(() => {
            this.onPixelClick.notify(temp);
        });
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
        this.clearPixels();
    }

    public clearPixels(): void {
        for (let i = 0; i < this.pixels.length; i++) {
            for (let j = 0; j < this.pixels[i].length; j++) {
                this.removeComponent(this.pixels[i][j]);
            }
        }
        this.pixels = [];
    }

    public getImage(): Color[][] {
        let temp: Color[][] = [];
        for (let i = 0; i < this.pixels.length; i++) {
            let tempRow: Color[] = [];
            for (let j = 0; j < this.pixels[i].length; j++) {
                tempRow.push(this.pixels[i][j].getColor());
            }
            temp.push(tempRow);
        }
        return temp;
    }

    public setColorAt(x: number, y: number, color: Color): void {
        if (this.pixels[y] && this.pixels[y][x]) {
            this.pixels[y][x].setColor(color);
        }
    }
}
