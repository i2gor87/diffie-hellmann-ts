import { Request, Response } from "express";
import { secretCommonKey } from "./ReturnBobKey";
import { decryptString } from "../utils/DecryptMessage";

export const GetCategories = async (req: any, res: Response) => {
    try {
        const response = ["category1", "category2"];
        if ( secretCommonKey == 0 ){
            throw new ReferenceError("Exception because of secret key. Secret key is "+ secretCommonKey);
        }
        else {
            var decryptedMessage = secretCommonKey.toString();
            if (decryptString(req.body.action, decryptedMessage) != "get me all categories") {
                throw new ReferenceError("Action stated wrong or could not decrypt well")
            }
            else if (decryptString(req.body.action, decryptedMessage) == "get me all categories") {
                return res.json({
                    success: true,
                    categories: response
                });
            }
        }
    }
    
    catch (e) {
        return res.json({
            success: false,
            data: {
                error: e.message
            }
        });
    }
};