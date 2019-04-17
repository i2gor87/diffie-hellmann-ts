import { isPrime } from "./GenerateRandomPrimeNumber";
import * as bi from "big-integer"
import { computeMod } from "./ComputeMod";

export const generateG = (p:number) => {
    var g:number;
    for (g=p; g<p+1000; g++) {
        if (isPrime(g)){
           if (computeMod(g, p-1, p) == 1) {
               return g
           }
        }
    }
};