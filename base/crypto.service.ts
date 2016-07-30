var bcrypt = require('bcrypt');
export class CryptoService {

  public static crypt(text: string, next: (error: any, result: string)=>any): any {
    bcrypt.genSalt(10, (err: any, salt: string)=> {
      bcrypt.hash(text, salt, (err: any, hash: string)=> {
        next(err, hash);
      });
    });
  }

  public static compare(text1: string, text2: string, next: (error: any, isEqual: boolean)=>any) {
    bcrypt.compare(text1, text2, (err: any, isEqual: boolean)=> {
      next(err, isEqual);
    });
  }

}
