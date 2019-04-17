import * as crypto from "crypto-js";

export const encryptString =  (_string: string, _secretKey: string) => {
    const res = crypto.AES.encrypt(_string, _secretKey);
    return res;
};