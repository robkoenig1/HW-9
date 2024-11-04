import { describe, expect, test, beforeAll } from "@jest/globals";
import { ToolbarComponent } from "./toolbar.component";
import { bootstrap } from "@boots-edu/webz";

describe("ToolbarComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<ToolbarComponent>(ToolbarComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(ToolbarComponent);
        });
    });
});
