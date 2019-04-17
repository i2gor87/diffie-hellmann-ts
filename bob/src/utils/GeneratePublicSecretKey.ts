import { generateRandomPrimeNumber } from "./GenerateRandomPrimeNumber";
import * as rp from "request-promise";
import { aliceURL } from "../_config/_dev";
import { bob_B } from "../endpoints/ReturnBobKey";

const keyGenerate = (base: number, modulo: number, exponent: number) => {
    // console.log("bobpn", base);
    // console.log("bobsn", modulo);
    // console.log("alicepn", exponent);
    if ( exponent == 0 ) {
        return 1;
    }
    var result = 1;
    base = base % exponent;
    var result = 1;
    var x = base;

    while(modulo > 0){
        var leastSignificantBit = modulo % 2;
        modulo = Math.floor(modulo / 2);

        if (leastSignificantBit == 1) {
            result = result * x;
            result = result % exponent;
        }

        x = x * x;
        x = x % exponent;
    }
    return result;
};

const bobPublicNumber = bob_B;
const url = aliceURL;

export const bobSecretNumber = generateRandomPrimeNumber();

export const secretKey = () => {
    return rp({
        method: "GET",
        uri:`${url}/get_key`,
        json: true
    }).then((rsp) => {
        const alicePublicNumber = rsp.data._key;
        const secret = keyGenerate(bobPublicNumber, bobSecretNumber, alicePublicNumber);
        return secret;
    });
};


