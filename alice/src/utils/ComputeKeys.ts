import { generateRandomPrimeNumber } from "./GenerateRandomPrimeNumber";
import { generateG } from "./GeneratePublicGKey";
import * as rp from "request-promise";
import { bobURL } from "../_config/_dev";
import { computeMod } from "./ComputeMod";

export var secretCommonKey = 0;

export const computeK = async () => {
    const alice_p = await generateRandomPrimeNumber(2);
    const alice_g = await generateG(alice_p);

    const alice_A = await generateRandomPrimeNumber(2);

    const alice_x = await computeMod(alice_g, alice_A, alice_p);
    const get_bob_y = () => {return rp({
        uri: `${bobURL}/get_key`,
        method: "POST",
        json: true,
        body: {
            alice_p: alice_p,
            alice_g: alice_g,
            alice_x: alice_x
        }
    }).then(
        (data) => {
            return data
        }
    );};
    const make_newSecretKey = await get_bob_y().then((bob_y) => {
        const computeNewSecretKey = computeMod(bob_y.data.bob_y, alice_A, alice_p);
        return computeNewSecretKey
    });
    secretCommonKey = make_newSecretKey;
    return make_newSecretKey
};

