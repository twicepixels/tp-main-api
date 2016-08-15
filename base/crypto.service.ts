var bcrypt = require('bcrypt');
export class CryptoService {

  public static crypt(text: string): Promise<any> {
    return new Promise((resolve: any, reject: any)=> {
      bcrypt.genSalt(10, (error: any, salt: string)=> {
        if (error) {
          reject(error);
        } else {
          bcrypt.hash(text, salt, (error: any, hash: string)=> {
            if (error) {
              reject(error);
            } else {
              resolve(hash);
            }
          });
        }
      });
    });
  }

  public static compare(text1: string, text2: string): Promise<any> {
    return new Promise((resolve: any, reject: any)=> {
      bcrypt.compare(text1, text2, (error: any, isEqual: boolean)=> {
        if (error) {
          reject(error);
        } else {
          resolve(isEqual);
        }
      });
    });
  }
}
