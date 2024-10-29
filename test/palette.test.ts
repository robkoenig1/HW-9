import { bootstrap } from "@boots-edu/webz";
import { MainComponent } from "../src/app/main.component";
import { ToolbarComponent } from "../src/app/toolbar/toolbar.component";
import { ClickablePixelComponent } from "../src/app/pixel/clickable-pixel.component";
import { PixelComponent } from "../src/app/pixel/pixel.component";
import { Color } from "../src/app/color";

describe("Toolbar", () => {
    let component: MainComponent;
    beforeEach(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<MainComponent>(MainComponent, html);
    });

    test("(1 pts) Toolbar is in MainComponent", () => {
        expect(component["toolbar"]).toBeDefined();
        expect(component["toolbar"]).toBeInstanceOf(ToolbarComponent);
    });

    test("(1 pts) Toolbar has been added to the id 'toolbar'", () => {
        const element = component["shadow"].getElementById(
            "toolbar",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) Toolbar has a 'swatches' element", () => {
        const element = component["toolbar"]["shadow"].getElementById(
            "swatches",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) Toolbar has an 'active' element", () => {
        const element = component["toolbar"]["shadow"].getElementById(
            "active",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) Toolbar has a 'DEFAULT_COLOR' field", () => {
        expect(component["toolbar"]["DEFAULT_COLOR"]).toBeDefined();
        expect(component["toolbar"]["DEFAULT_COLOR"]).toBeInstanceOf(Color);
    });

    test("(1 pts) Toolbar class has a 'swatches' field ", () => {
        expect(component["toolbar"]["swatches"]).toBeDefined();
        expect(component["toolbar"]["swatches"]).toBeInstanceOf(Array);
    });

    test("(1 pts) Toolbar class has an 'active' field ", () => {
        expect(component["toolbar"]["active"]).toBeDefined();
        expect(component["toolbar"]["active"]).toBeInstanceOf(PixelComponent);
    });

    test("(1 pts) Toolbar has 9 swatches in array", () => {
        expect(component["toolbar"]["swatches"].length).toBe(9);
    });

    test("(1 pts) Toolbar has 9 swatches on the screen", () => {
        const element = component["toolbar"]["shadow"].getElementById(
            "swatches",
        ) as HTMLElement;
        expect(element.children.length).toBe(9);

        for (let i = 0; i < 9; i++) {
            const child = element.children[i] as HTMLElement;
            expect(child).not.toBeNull();
            const pixel = child.shadowRoot?.getElementById("pixel");
            expect(pixel).not.toBeNull();
        }
    });

    test("(1 pts) Can get active color from active pixel", () => {
        const color = component["toolbar"].getActiveColor();
        expect(color).toBeDefined();
        expect(color).toBeInstanceOf(Color);
        expect(color).toEqual(component["toolbar"].DEFAULT_COLOR);
    });

    test("(1 pts) Clicking the black swatch sets the active color to black", () => {
        const element = component["toolbar"]["shadow"].getElementById(
            "swatches",
        ) as HTMLElement;
        expect(element).not.toBeNull();

        // First swatch is black
        const blackSwatch = element.children[0].shadowRoot?.getElementById(
            "pixel",
        ) as HTMLElement;
        blackSwatch.click();
        expect(component["toolbar"].getActiveColor()).toEqual(
            new Color(0, 0, 0),
        );
    });
    test("(1 pts) Clicking the white swatch sets the active color to white", () => {
        const element = component["toolbar"]["shadow"].getElementById(
            "swatches",
        ) as HTMLElement;
        expect(element).not.toBeNull();

        // Second swatch is white
        const whiteSwatch = element.children[1].shadowRoot?.getElementById(
            "pixel",
        ) as HTMLElement;
        whiteSwatch.click();
        expect(component["toolbar"].getActiveColor()).toEqual(
            new Color(255, 255, 255),
        );
    });

    test("(1 pts) Clicking the blue swatch sets the active color to blue", () => {
        const element = component["toolbar"]["shadow"].getElementById(
            "swatches",
        ) as HTMLElement;
        expect(element).not.toBeNull();

        // Fifth swatch is blue
        const whiteSwatch = element.children[4].shadowRoot?.getElementById(
            "pixel",
        ) as HTMLElement;
        whiteSwatch.click();
        expect(component["toolbar"].getActiveColor()).toEqual(
            new Color(0, 0, 255),
        );
    });

    test("(4 pts) Clicking red, then blue, then green", () => {
        const element = component["toolbar"]["shadow"].getElementById(
            "swatches",
        ) as HTMLElement;
        expect(element).not.toBeNull();

        // Red is index 2, green is index 3, blue is index 4
        const redSwatch = element.children[2].shadowRoot?.getElementById(
            "pixel",
        ) as HTMLElement;
        const greenSwatch = element.children[3].shadowRoot?.getElementById(
            "pixel",
        ) as HTMLElement;
        const blueSwatch = element.children[4].shadowRoot?.getElementById(
            "pixel",
        ) as HTMLElement;

        redSwatch.click();
        expect(component["toolbar"].getActiveColor()).toEqual(
            new Color(255, 0, 0),
        );
        greenSwatch.click();
        expect(component["toolbar"].getActiveColor()).toEqual(
            new Color(0, 255, 0),
        );
        blueSwatch.click();
        expect(component["toolbar"].getActiveColor()).toEqual(
            new Color(0, 0, 255),
        );
    });
});
