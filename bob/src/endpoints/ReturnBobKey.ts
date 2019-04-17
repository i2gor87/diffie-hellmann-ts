import { generateRandomPrimeNumber } from "../utils/GenerateRandomPrimeNumber";
import { Request, Response } from 'express';
import { computeKey } from "../utils/_ComputeMethod";

export var bob_B = generateRandomPrimeNumber();
export var secretCommonKey = 0;

export const getBKey = async (req: Request, res: Response) => {
    try {
        const alice_p = req.body.alice_p;
        const alice_g = req.body.alice_g;
        const alice_x = req.body.alice_x;
        const bob_y = await computeKey(alice_g, bob_B, alice_p);
        secretCommonKey = await computeKey(alice_x, bob_B, alice_p);
        const response = {
            bob_y: bob_y
        };
        return res.json({
            success: true,
            data: response
        });
    }
    catch (e) {
        return res.json({
            success: false,
            data: {
                error: e.message
            }
        });
    };

};
