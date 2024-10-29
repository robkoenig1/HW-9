import { bootstrap } from "@boots-edu/webz";
import { MainComponent } from "../src/app/main.component";
import { GridComponent } from "../src/app/grid/grid.component";
import { Color } from "../src/app/color";
import { PixelComponent } from "../src/app/pixel/pixel.component";

describe("Preview", () => {
    let component: MainComponent;
    beforeEach(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<MainComponent>(MainComponent, html);
    });

    test("(1 pts) Preview is in MainComponent and is a GridComponent", () => {
        expect(component["preview"]).toBeDefined();
        expect(component["preview"]).toBeInstanceOf(GridComponent);
    });

    test("(1 pts) Preview has been added to the id 'preview'", () => {
        const element = component["shadow"].getElementById(
            "preview",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) Main has a DEFAULT_IMAGE field", () => {
        expect(component["DEFAULT_IMAGE"]).toBeDefined();
        expect(component["DEFAULT_IMAGE"]).toBeInstanceOf(Array);
        expect(component["DEFAULT_IMAGE"][0]).toBeInstanceOf(Array);
        expect(component["DEFAULT_IMAGE"][0][0]).toBeDefined();
        expect(component["DEFAULT_IMAGE"][0][0]).toBeInstanceOf(Color);
    });

    test("(1 pts) Grid has a 'pixels' element", () => {
        const element = component["preview"]["shadow"].getElementById(
            "pixels",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) Grid class has a 'pixels' field ", () => {
        expect(component["preview"]["pixels"]).toBeDefined();
        expect(component["preview"]["pixels"]).toBeInstanceOf(Array);
    });

    test("(1 pts) The number of Pixels in preview match the DEFAULT_IMAGE", () => {
        const pixels = component["preview"]["pixels"];
        const defaultImage = component["DEFAULT_IMAGE"];
        expect(pixels.length).toBe(defaultImage.length);
        for (let y = 0; y < pixels.length; y++) {
            expect(pixels[y].length).toBe(defaultImage[y].length);
        }
    });

    test("(1 pts) Grid class has size, gap, and zoom fields", () => {
        expect(component["preview"]["size"]).toBeDefined();
        expect(component["preview"]["gap"]).toBeDefined();
        expect(component["preview"]["zoom"]).toBeDefined();
    });

    test("(1 pts) Grid classes size field is set correctly", () => {
        expect(component["preview"]["size"]).toBe(
            component["preview"]["pixels"].length *
                (component["preview"]["gap"] + component["preview"]["zoom"]) -
                component["preview"]["gap"],
        );
    });

    test("(1 pts) Grid class has a loadImage method", () => {
        expect(component["preview"]["loadImage"]).toBeDefined();

        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["preview"]["loadImage"](colors);
        expect(component["preview"]["pixels"][0][0].getColor()).toEqual(
            new Color(0, 0, 0),
        );
        expect(component["preview"]["pixels"][0][1].getColor()).toEqual(
            new Color(0, 128, 0),
        );
        expect(component["preview"]["pixels"][1][0].getColor()).toEqual(
            new Color(255, 0, 255),
        );
        expect(component["preview"]["pixels"][1][1].getColor()).toEqual(
            new Color(6, 7, 8),
        );
    });

    test("(1 pts) The loadImage method correctly clears old pixels", () => {
        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["preview"]["loadImage"](colors);
        component["preview"]["loadImage"]([
            [new Color(255, 255, 255), new Color(255, 255, 255)],
        ]);
        expect(component["preview"]["pixels"][0][0].getColor()).toEqual(
            new Color(255, 255, 255),
        );
        expect(component["preview"]["pixels"][0][1].getColor()).toEqual(
            new Color(255, 255, 255),
        );
        expect(component["preview"]["pixels"].length).toBe(1);
        expect(component["preview"]["pixels"][0].length).toBe(2);
    });

    test("(1 pts) The loadImage method updates the size field", () => {
        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["preview"]["loadImage"](colors);
        const gap = component["preview"]["gap"];
        const zoom = component["preview"]["zoom"];
        expect(component["preview"]["size"]).toBe(2 * (gap + zoom) - gap);

        component["preview"]["loadImage"]([
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
        expect(component["preview"]["size"]).toBe(3 * (gap + zoom) - gap);
    });

    test("(1 pts) Grid class has a getImage method", () => {
        expect(component["preview"]["getImage"]).toBeDefined();

        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["preview"]["loadImage"](colors);
        const image = component["preview"]["getImage"]();
        expect(image).toEqual(colors);

        const colors2 = [[new Color(255, 255, 255), new Color(255, 255, 255)]];
        component["preview"]["loadImage"](colors2);
        const image2 = component["preview"]["getImage"]();
        expect(image2).toEqual(colors2);
    });

    test("(1 pts) Grid class has an addPixel method", () => {
        expect(component["preview"]["addPixel"]).toBeDefined();

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

        const pixel = component["preview"]["addPixel"](
            2,
            3,
            new Color(9, 9, 9),
        );
        expect(pixel).toBeDefined();
        expect(pixel).toBeInstanceOf(PixelComponent);
        expect(pixel.getColor()).toEqual(new Color(9, 9, 9));
        expect(pixel.getX()).toBe(2);
        expect(pixel.getY()).toBe(3);
        expect(pixel["size"]).toEqual(component["preview"]["zoom"]);

        expect(component["preview"]["pixels"][3][2]).toBe(pixel);
    });

    test("(1 pts) Grid class has a setColorAt method", () => {
        expect(component["preview"]["setColorAt"]).toBeDefined();

        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["preview"]["loadImage"](colors);
        component["preview"]["setColorAt"](1, 0, new Color(255, 255, 255));
        expect(component["preview"]["pixels"][0][1].getColor()).toEqual(
            new Color(255, 255, 255),
        );

        component["preview"]["setColorAt"](0, 1, new Color(255, 255, 255));
        expect(component["preview"]["pixels"][1][0].getColor()).toEqual(
            new Color(255, 255, 255),
        );

        component["preview"]["setColorAt"](1, 1, new Color(11, 12, 13));
        expect(component["preview"]["pixels"][1][1].getColor()).toEqual(
            new Color(11, 12, 13),
        );
    });

    test("(1 pts) The setColorAt mutates, does not replace the pixel", () => {
        const colors = [
            [new Color(0, 0, 0), new Color(0, 128, 0)],
            [new Color(255, 0, 255), new Color(6, 7, 8)],
        ];
        component["preview"]["loadImage"](colors);
        const pixel = component["preview"]["pixels"][0][1];
        component["preview"]["setColorAt"](1, 0, new Color(255, 255, 255));
        expect(component["preview"]["pixels"][0][1]).toBe(pixel);
    });

    test("(1 pts) Preview loads the default image", () => {
        const defaultImage = component.DEFAULT_IMAGE;
        const colors = component["preview"].getImage();
        expect(colors).toEqual(defaultImage);
    });
});
