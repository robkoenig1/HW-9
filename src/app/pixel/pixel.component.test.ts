import { describe, expect, test, beforeAll } from "@jest/globals";
import { PixelComponent } from "./pixel.component";
import { bootstrap } from "@boots-edu/webz";
import { Color } from "./color";

describe("PixelComponent", () => {
    let component: PixelComponent | undefined = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<PixelComponent>(PixelComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(PixelComponent);
        });
    });

    // New tests!
    describe("Methods", () => {
        test("(1pts) Pixels can change color", () => {
            expect(component).toBeDefined();
            if (component === undefined) {
                return;
            }
            // Try changing it to be red
            const red = new Color(255, 0, 0);
            component.setColor(red);
            expect(component.getColor()).toEqual(red);
            expect(
                component["shadow"].getElementById("pixel").style
                    .backgroundColor,
            ).toBe("rgb(255, 0, 0)");

            // Try changing it to be cyan
            const cyan = new Color(0, 255, 255);
            component.setColor(cyan);
            expect(component.getColor()).toEqual(cyan);
            expect(
                component["shadow"].getElementById("pixel").style
                    .backgroundColor,
            ).toBe("rgb(0, 255, 255)");
        });

        test("(1 pts) Pixels can change size", () => {
            expect(component).toBeDefined();
            if (component === undefined) {
                return;
            }
            // Try changing it to be 20x20
            component.setSize(20);
            expect(
                component["shadow"].getElementById("pixel").style.width,
            ).toBe("20px");
            expect(
                component["shadow"].getElementById("pixel").style.height,
            ).toBe("20px");

            // Try changing it to be 10x10
            component.setSize(10);
            expect(
                component["shadow"].getElementById("pixel").style.width,
            ).toBe("10px");
            expect(
                component["shadow"].getElementById("pixel").style.height,
            ).toBe("10px");
        });
    });
});
