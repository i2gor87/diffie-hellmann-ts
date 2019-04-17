import { Request, Response } from 'express';
import { encryptString } from "../utils/_EncryptMessage";
import * as rp from "request-promise";
import { bobURL } from "../_config/_dev";
import { secretCommonKey } from "../utils/ComputeKeys";
import { computeK } from "../utils/ComputeKeys";

export const getCategoriesfromBob = async (_: Request, res: Response) => {
    try {
        var doesnotmatter = await computeK();
        if (secretCommonKey == 0 ) {
            throw new ReferenceError("secretCommonKey is null, something is wrong")
        }
        else {
            return rp({
                method: "POST",
                uri: `${bobURL}/get_categories`,
                body: {
                    action: encryptString("get me all categories", secretCommonKey.toString())
                },
                json: true
            }).then((response) => {
                return res.json({
                    success: true,
                    data: {
                        categories: response.categories
                    }
                });
            }, (e) => {
                return res.json({
                    success: false,
                    data: {
                        error: e.message
                    }
                })
            });
        }


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