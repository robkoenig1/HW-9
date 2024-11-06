import html from "./main.component.html";
import css from "./main.component.css";
import { WebzComponent } from "@boots-edu/webz";
//import { PixelComponent } from "./pixel/pixel.component";
import { ClickablePixelComponent } from "./pixel/clickable-pixel.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { GridComponent } from "./grid/grid.component";
import { Color, convertPalette } from "./color";

/**
 * @description MainComponent is the main component of the app
 * @extends WebzComponent
 *
 */

export class MainComponent extends WebzComponent {
    public preview: GridComponent;
    public toolbar: ToolbarComponent;
    public editor: GridComponent;
    public DEFAULT_IMAGE: Color[][] = convertPalette([
        [5, 5, 5, 5, 5],
        [5, 0, 5, 0, 5],
        [5, 5, 5, 5, 5],
        [5, 0, 5, 0, 5],
        [5, 0, 0, 0, 5],
    ]);

    constructor() {
        super(html, css);
        //const testPixel = new PixelComponent(0, 0);
        //testPixel.setColor(new Color(255, 0, 0)); // Red
        //testPixel.setSize(50); // 50px by 50px
        //this.addComponent(testPixel);
        this.preview = new GridComponent(1, 32);
        this.addComponent(this.preview);
        this.preview.loadImage(this.DEFAULT_IMAGE);
        this.toolbar = new ToolbarComponent();
        this.addComponent(this.toolbar);
        this.editor = new GridComponent(1, 32);
        this.addComponent(this.editor);
        this.editor.loadImage(this.DEFAULT_IMAGE);
        this.editor.onPixelClick.subscribe((pixel: ClickablePixelComponent) => {
            this.editor.setColorAt(
                pixel.getX(),
                pixel.getY(),
                this.toolbar.getActiveColor(),
            );
            this.preview.setColorAt(
                pixel.getX(),
                pixel.getY(),
                this.toolbar.getActiveColor(),
            );
        });
    }
}
