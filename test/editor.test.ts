import { bootstrap } from "@boots-edu/webz";
import { MainComponent } from "../src/app/main.component";
import { GridComponent } from "../src/app/grid/grid.component";
import { Color } from "../src/app/color";
import { PixelComponent } from "../src/app/pixel/pixel.component";

describe("Editor", () => {
    let component: MainComponent;
    beforeEach(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<MainComponent>(MainComponent, html);
    });

    test("(1 pts) Editor is in MainComponent and is a GridComponent", () => {
        expect(component["editor"]).toBeDefined();
        expect(component["editor"]).toBeInstanceOf(GridComponent);
    });

    test("(1 pts) Editor has been added to the id 'editor'", () => {
        const element = component["shadow"].getElementById(
            "editor",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) Editor has a 'pixels' element", () => {
        const element = component["editor"]["shadow"].getElementById(
            "pixels",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) Editor class has a 'pixels' field ", () => {
        expect(component["editor"]["pixels"]).toBeDefined();
        expect(component["editor"]["pixels"]).toBeInstanceOf(Array);
    });

    test("(1 pts) The number of Pixels in editor match the DEFAULT_IMAGE", () => {
        const pixels = component["editor"]["pixels"];
        const defaultImage = component["DEFAULT_IMAGE"];
        expect(pixels.length).toBe(defaultImage.length);
        for (let y = 0; y < pixels.length; y++) {
            expect(pixels[y].length).toBe(defaultImage[y].length);
        }
    });

    test("(1 pts) Editor class has size, gap, and zoom fields", () => {
        expect(component["editor"]["size"]).toBeDefined();
        expect(component["editor"]["gap"]).toBeDefined();
        expect(component["editor"]["zoom"]).toBeDefined();
    });

    test("(1 pts) Editor classes size field is set correctly", () => {
        expect(component["editor"]["size"]).toBe(
            component["editor"]["pixels"].length *
                (component["editor"]["gap"] + component["editor"]["zoom"]) -
                component["editor"]["gap"],
        );
    });

    test("(1 pts) Editor class has a loadImage method", () => {
        expect(component["editor"]["loadImage"]).toBeDefined();

        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["editor"]["loadImage"](colors);
        expect(component["editor"]["pixels"][0][0].getColor()).toEqual(
            new Color(0, 0, 0),
        );
        expect(component["editor"]["pixels"][0][1].getColor()).toEqual(
            new Color(0, 128, 0),
        );
        expect(component["editor"]["pixels"][1][0].getColor()).toEqual(
            new Color(255, 0, 255),
        );
        expect(component["editor"]["pixels"][1][1].getColor()).toEqual(
            new Color(6, 7, 8),
        );
    });

    test("(1 pts) The loadImage method correctly clears old pixels", () => {
        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["editor"]["loadImage"](colors);
        component["editor"]["loadImage"]([
            [new Color(255, 255, 255), new Color(255, 255, 255)],
        ]);
        expect(component["editor"]["pixels"][0][0].getColor()).toEqual(
            new Color(255, 255, 255),
        );
        expect(component["editor"]["pixels"][0][1].getColor()).toEqual(
            new Color(255, 255, 255),
        );
        expect(component["editor"]["pixels"].length).toBe(1);
        expect(component["editor"]["pixels"][0].length).toBe(2);
    });

    test("(1 pts) The loadImage method updates the size field", () => {
        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["editor"]["loadImage"](colors);
        const gap = component["editor"]["gap"];
        const zoom = component["editor"]["zoom"];
        expect(component["editor"]["size"]).toBe(2 * (gap + zoom) - gap);

        component["editor"]["loadImage"]([
            [
                new Color(255, 255, 255),
                new Color(255, 255, 255),
                new Color(255, 255, 255),
            ],
            [
                new Color(255, 255, 255),
                new Color(255, 255, 255),
                new Color(255, 255, 255),
            ],
            [
                new Color(255, 255, 255),
                new Color(255, 255, 255),
                new Color(255, 255, 255),
            ],
        ]);
        expect(component["editor"]["size"]).toBe(3 * (gap + zoom) - gap);
    });

    test("(1 pts) Editor class has a getImage method", () => {
        expect(component["editor"]["getImage"]).toBeDefined();

        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["editor"]["loadImage"](colors);
        const image = component["editor"]["getImage"]();
        expect(image).toEqual(colors);

        const colors2 = [[new Color(255, 255, 255), new Color(255, 255, 255)]];
        component["editor"]["loadImage"](colors2);
        const image2 = component["editor"]["getImage"]();
        expect(image2).toEqual(colors2);
    });

    test("(1 pts) Editor class has an addPixel method", () => {
        expect(component["editor"]["addPixel"]).toBeDefined();

        const colors = [
            [
                new Color(100, 100, 100),
                new Color(101, 101, 101),
                new Color(102, 102, 102),
                new Color(103, 103, 103),
            ],
            [
                new Color(200, 200, 200),
                new Color(201, 201, 201),
                new Color(202, 202, 202),
                new Color(203, 203, 203),
            ],
            [
                new Color(300, 300, 300),
                new Color(301, 301, 301),
                new Color(302, 302, 302),
                new Color(303, 303, 303),
            ],
            [
                new Color(400, 400, 400),
                new Color(401, 401, 401),
                new Color(402, 402, 402),
                new Color(403, 403, 403),
            ],
        ];

        const pixel = component["editor"]["addPixel"](2, 3, new Color(9, 9, 9));
        expect(pixel).toBeDefined();
        expect(pixel).toBeInstanceOf(PixelComponent);
        expect(pixel.getColor()).toEqual(new Color(9, 9, 9));
        expect(pixel.getX()).toBe(2);
        expect(pixel.getY()).toBe(3);
        expect(pixel["size"]).toEqual(component["editor"]["zoom"]);

        expect(component["editor"]["pixels"][3][2]).toBe(pixel);
    });

    test("(1 pts) Editor class has a setColorAt method", () => {
        expect(component["editor"]["setColorAt"]).toBeDefined();

        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["editor"]["loadImage"](colors);
        component["editor"]["setColorAt"](1, 0, new Color(255, 255, 255));
        expect(component["editor"]["pixels"][0][1].getColor()).toEqual(
            new Color(255, 255, 255),
        );

        component["editor"]["setColorAt"](0, 1, new Color(255, 255, 255));
        expect(component["editor"]["pixels"][1][0].getColor()).toEqual(
            new Color(255, 255, 255),
        );

        component["editor"]["setColorAt"](1, 1, new Color(11, 12, 13));
        expect(component["editor"]["pixels"][1][1].getColor()).toEqual(
            new Color(11, 12, 13),
        );
    });

    test("(1 pts) The setColorAt mutates, does not replace the pixel", () => {
        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["editor"]["loadImage"](colors);
        const pixel = component["editor"]["pixels"][0][1];
        component["editor"]["setColorAt"](1, 0, new Color(255, 255, 255));
        expect(component["editor"]["pixels"][0][1]).toBe(pixel);
    });

    test("(4 pts) Clicking on a pixel changes the color", () => {
        const colors = [
            [new Color(13, 13, 13), new Color(14, 14, 14)],
            [new Color(15, 15, 15), new Color(16, 16, 16)],
        ];
        component["editor"]["loadImage"](colors);

        let pixel = component["editor"]["pixels"][0][1];
        const pixelElement = pixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement.click();
        const activeColor = component["toolbar"].getActiveColor();
        expect(pixel.getColor()).toEqual(activeColor);

        pixel = component["editor"]["pixels"][1][0];
        const pixelElement2 = pixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement2.click();
        expect(pixel.getColor()).toEqual(activeColor);

        pixel = component["editor"]["pixels"][1][1];
        const pixelElement3 = pixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement3.click();
        expect(pixel.getColor()).toEqual(activeColor);

        pixel = component["editor"]["pixels"][0][0];
        const pixelElement4 = pixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement4.click();
        expect(pixel.getColor()).toEqual(activeColor);
    });

    test("(2 pts) Changing swatch and then clicking on a pixel changes the color", () => {
        const colors = [
            [new Color(13, 13, 13), new Color(14, 14, 14)],
            [new Color(15, 15, 15), new Color(16, 16, 16)],
        ];
        component["editor"]["loadImage"](colors);

        const swatchElement = component["toolbar"]["shadow"].getElementById(
            "swatches",
        ) as HTMLElement;
        const secondSwatch =
            swatchElement.children[1].shadowRoot?.getElementById(
                "pixel",
            ) as HTMLElement;
        secondSwatch.click();
        const fifthSwatch =
            swatchElement.children[4].shadowRoot?.getElementById(
                "pixel",
            ) as HTMLElement;

        let pixel = component["editor"]["pixels"][0][1];
        const pixelElement = pixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement.click();
        expect(pixel.getColor()).toEqual(new Color(255, 255, 255));

        fifthSwatch.click();
        pixelElement.click();
        expect(pixel.getColor()).toEqual(new Color(0, 0, 255));
    });

    test("(4 pts) Clicking on an editor's pixel changes the preview", () => {
        const colors = [
            [new Color(13, 13, 13), new Color(14, 14, 14)],
            [new Color(15, 15, 15), new Color(16, 16, 16)],
        ];
        component["editor"]["loadImage"](colors);

        let editorPixel = component["editor"]["pixels"][0][1];
        const pixelElement = editorPixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement.click();
        let previewPixel = component["preview"]["pixels"][0][1];
        const activeColor = component["toolbar"].getActiveColor();
        expect(previewPixel.getColor()).toEqual(activeColor);

        editorPixel = component["editor"]["pixels"][1][0];
        const pixelElement2 = editorPixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement2.click();
        previewPixel = component["preview"]["pixels"][1][0];
        expect(previewPixel.getColor()).toEqual(activeColor);
    });

    test("(4 pts) Changing the active color and clicking a pixel changes the preview", () => {
        let editorPixel = component["editor"]["pixels"][0][1];
        const pixelElement = editorPixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement.click();
        let previewPixel = component["preview"]["pixels"][0][1];
        let activeColor = component["toolbar"].getActiveColor();
        expect(previewPixel.getColor()).toEqual(activeColor);

        const swatch = component["toolbar"]["swatches"][3];
        const swatchElement = swatch["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        swatchElement.click();
        activeColor = component["toolbar"].getActiveColor();

        editorPixel = component["editor"]["pixels"][1][0];
        const pixelElement2 = editorPixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement2.click();
        previewPixel = component["preview"]["pixels"][1][0];
        expect(previewPixel.getColor()).toEqual(activeColor);
    });

    test("(4 pts) Clicking on the preview does not change the preview or the editor", () => {
        const colors = [
            [new Color(13, 13, 13), new Color(14, 14, 14)],
            [new Color(15, 15, 15), new Color(16, 16, 16)],
        ];
        component["editor"]["loadImage"](colors);
        component["preview"]["loadImage"](colors);

        let previewPixel = component["preview"]["pixels"][0][1];
        const pixelElement = previewPixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement.click();
        let editorPixel = component["editor"]["pixels"][0][1];
        expect(editorPixel.getColor()).toEqual(new Color(14, 14, 14));
        expect(previewPixel.getColor()).toEqual(new Color(14, 14, 14));

        previewPixel = component["preview"]["pixels"][1][0];
        const pixelElement2 = previewPixel["shadow"].getElementById(
            "pixel",
        ) as HTMLElement;
        pixelElement2.click();
        editorPixel = component["editor"]["pixels"][1][0];
        expect(editorPixel.getColor()).toEqual(new Color(15, 15, 15));
        expect(previewPixel.getColor()).toEqual(new Color(15, 15, 15));
    });
});
