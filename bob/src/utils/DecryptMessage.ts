import * as crypto from "crypto-js";

export const decryptString = (_string: string, _secretKey: string) => {
    const res = crypto.AES.decrypt(_string, _secretKey).toString(crypto.enc.Utf8);
    return res
};