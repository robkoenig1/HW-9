import exp from "constants";
import { Color, PALETTE, convertPalette, makeColor } from "../src/app/color";

describe("Color", () => {
    test("(1 pts) Color class has a constructor", () => {
        const color = new Color(0, 0, 0);
        expect(color).toBeDefined();
    });

    test("(1 pts) Color has private red, green, and blue fields", () => {
        const color = new Color(0, 0, 0);
        expect(color["red"]).toBeDefined();
        expect(color["green"]).toBeDefined();
        expect(color["blue"]).toBeDefined();

        const red = new Color(255, 0, 0);
        expect(red["red"]).toBe(255);
        expect(red["green"]).toBe(0);
        expect(red["blue"]).toBe(0);

        const cyan = new Color(0, 255, 255);
        expect(cyan["red"]).toBe(0);
        expect(cyan["green"]).toBe(255);
        expect(cyan["blue"]).toBe(255);
    });

    test("(1 pts) Color class has a toString method", () => {
        const color = new Color(0, 0, 0);
        expect(color.toString).toBeDefined();
        expect(color.toString()).toBe("rgb(0,0,0)");

        const red = new Color(255, 0, 0);
        expect(red.toString()).toBe("rgb(255,0,0)");

        const cyan = new Color(0, 255, 255);
        expect(cyan.toString()).toBe("rgb(0,255,255)");

        const white = new Color(255, 255, 255);
        expect(white.toString()).toBe("rgb(255,255,255)");
    });

    test("(1 pts) Color class has an asNumbers method", () => {
        const color = new Color(0, 0, 0);
        expect(color.asNumbers).toBeDefined();
        expect(color.asNumbers()).toEqual([0, 0, 0]);

        const red = new Color(255, 0, 0);
        expect(red.asNumbers()).toEqual([255, 0, 0]);

        const cyan = new Color(0, 255, 255);
        expect(cyan.asNumbers()).toEqual([0, 255, 255]);

        const white = new Color(255, 255, 255);
        expect(white.asNumbers()).toEqual([255, 255, 255]);
    });
});

describe("Palette", () => {
    test("(1 pts) PALETTE is defined with the right values", () => {
        expect(PALETTE).toBeDefined();
        expect(PALETTE.length).toBe(9);
        expect(PALETTE[0]).toEqual([0, 0, 0]);
        expect(PALETTE[1]).toEqual([255, 255, 255]);
        expect(PALETTE[2]).toEqual([255, 0, 0]);
        expect(PALETTE[3]).toEqual([0, 255, 0]);
        expect(PALETTE[4]).toEqual([0, 0, 255]);
        expect(PALETTE[5]).toEqual([255, 255, 0]);
        expect(PALETTE[6]).toEqual([255, 0, 255]);
        expect(PALETTE[7]).toEqual([0, 255, 255]);
        expect(PALETTE[8]).toEqual([128, 128, 128]);
    });
});

describe("makeColor", () => {
    test("(1 pts) makeColor is defined", () => {
        expect(makeColor).toBeDefined();
    });

    test("(1 pts) makeColor returns a Color instance", () => {
        const color = makeColor(0);
        expect(color).toBeDefined();
        expect(color).toBeInstanceOf(Color);
    });

    test("(1 pts) makeColor returns the right color", () => {
        const black = makeColor(0);
        expect(black).toEqual(new Color(0, 0, 0));

        const white = makeColor(1);
        expect(white).toEqual(new Color(255, 255, 255));

        const red = makeColor(2);
        expect(red).toEqual(new Color(255, 0, 0));

        const green = makeColor(3);
        expect(green).toEqual(new Color(0, 255, 0));

        const blue = makeColor(4);
        expect(blue).toEqual(new Color(0, 0, 255));

        const yellow = makeColor(5);
        expect(yellow).toEqual(new Color(255, 255, 0));

        const magenta = makeColor(6);
        expect(magenta).toEqual(new Color(255, 0, 255));

        const cyan = makeColor(7);
        expect(cyan).toEqual(new Color(0, 255, 255));

        const gray = makeColor(8);
        expect(gray).toEqual(new Color(128, 128, 128));
    });

    test("(1 pts) makeColor throws an error for invalid index", () => {
        expect(() => makeColor(-1)).toThrow();
        expect(() => makeColor(999)).toThrow();
    });
});

describe("convertPalette", () => {
    test("(1 pts) convertPalette is defined", () => {
        expect(convertPalette).toBeDefined();
    });

    test("(1 pts) convertPalette returns a 2D array of Color", () => {
        const colors = convertPalette([
            [0, 1],
            [2, 3],
        ]);
        expect(colors).toBeDefined();
        expect(colors.length).toBe(2);
        expect(colors[0].length).toBe(2);
        expect(colors[0][0]).toBeInstanceOf(Color);
    });

    test("(1 pts) convertPalette returns the right colors", () => {
        const colors = convertPalette([
            [0, 1],
            [2, 3],
        ]);
        expect(colors[0][0]).toEqual(new Color(0, 0, 0));
        expect(colors[0][1]).toEqual(new Color(255, 255, 255));
        expect(colors[1][0]).toEqual(new Color(255, 0, 0));
        expect(colors[1][1]).toEqual(new Color(0, 255, 0));
    });

    test("(1 pts) convertPalette works on 4x4 grid", () => {
        const colors = convertPalette([
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 0, 1, 2],
            [3, 4, 5, 6],
        ]);
        expect(colors[0][0]).toEqual(new Color(0, 0, 0));
        expect(colors[0][1]).toEqual(new Color(255, 255, 255));
        expect(colors[0][2]).toEqual(new Color(255, 0, 0));
        expect(colors[0][3]).toEqual(new Color(0, 255, 0));
        expect(colors[1][0]).toEqual(new Color(0, 0, 255));
        expect(colors[1][1]).toEqual(new Color(255, 255, 0));
        expect(colors[1][2]).toEqual(new Color(255, 0, 255));
        expect(colors[1][3]).toEqual(new Color(0, 255, 255));
        expect(colors[2][0]).toEqual(new Color(128, 128, 128));
        expect(colors[2][1]).toEqual(new Color(0, 0, 0));
        expect(colors[2][2]).toEqual(new Color(255, 255, 255));
        expect(colors[2][3]).toEqual(new Color(255, 0, 0));
        expect(colors[3][0]).toEqual(new Color(0, 255, 0));
        expect(colors[3][1]).toEqual(new Color(0, 0, 255));
        expect(colors[3][2]).toEqual(new Color(255, 255, 0));
        expect(colors[3][3]).toEqual(new Color(255, 0, 255));
    });
});
