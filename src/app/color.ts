export class Color {
    private red: number;
    private green: number;
    private blue: number;

    constructor(_red: number, _green: number, _blue: number) {
        this.red = _red;
        this.green = _green;
        this.blue = _blue;
    }

    toString(): string {
        return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    }
    asNumbers(): number[] {
        let temp: number[] = [];
        temp.push(this.red);
        temp.push(this.green);
        temp.push(this.blue);
        return temp;
    }
}

export const smileyFace: number[][] = [
    [5, 5, 5, 5, 5],
    [5, 0, 5, 0, 5],
    [5, 5, 5, 5, 5],
    [5, 0, 5, 0, 5],
    [5, 0, 0, 0, 5],
];

export const PALETTE: number[][] = [
    [0, 0, 0], // Black
    [255, 255, 255], // White
    [255, 0, 0], // Red
    [0, 255, 0], // Green
    [0, 0, 255], // Blue
    [255, 255, 0], // Yellow
    [255, 0, 255], // Magenta
    [0, 255, 255], // Cyan
    [128, 128, 128], // Gray
];

export function makeColor(input: number): Color {
    if (input > 8) {
        throw new Error("Invalid color index");
    }
    return new Color(PALETTE[input][0], PALETTE[input][1], PALETTE[input][2]);
}

export function convertPalette(input: number[][]): Color[][] {
    let output: Color[][] = [];
    for (let i: number = 0; i < input.length; i++) {
        let temp: Color[] = [];
        for (let j: number = 0; j < input[i].length; j++) {
            temp.push(makeColor(input[i][j]));
        }
        output.push(temp);
    }
    return output;
}
