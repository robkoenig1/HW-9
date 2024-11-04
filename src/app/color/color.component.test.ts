import { describe, expect, test, beforeAll } from "@jest/globals";
import { ColorComponent } from "./color.component";
import { bootstrap } from "@boots-edu/webz";

describe("ColorComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<ColorComponent>(ColorComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(ColorComponent);
        });
    });
});
