import * as bi from "big-integer"

export const computeMod = (base: number, pow: number, modulo: number) => {
    const l = bi(base);
    const s = l.pow(pow);
    const b = s.mod(modulo);
    return b.valueOf()
};