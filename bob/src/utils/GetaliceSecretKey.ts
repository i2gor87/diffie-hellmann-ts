import * as rp from "request-promise";
import { aliceURL } from "../_config/_dev";
import { secretKey } from "./GeneratePublicSecretKey";

const url = aliceURL;

export const GetaliceSecretKey = () => {
    return rp({
        method: "POST",
        uri: `${url}/secretKey`,
        body: {
            secretKey: secretKey
        },
        json: true
    })
};