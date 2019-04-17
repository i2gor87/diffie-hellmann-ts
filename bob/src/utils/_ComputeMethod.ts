import * as bi from "big-integer";

export const computeKey = (base: number, pow: number, modulo: number) => {
    return bi(base).pow(pow).mod(modulo).valueOf()
};