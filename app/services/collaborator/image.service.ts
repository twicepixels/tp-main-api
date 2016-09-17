import { Request, Response } from "express";
import {AWSService} from "../../../base/aws.service";


export class ImageService extends AWSService {

  protected arrayPromises:Array<Promise<any>> = [];

  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public uploadFiles(req:any): Promise<any>{
    return new Promise((resolve: any, reject: any)=> {
      this.formidableUploadFiles(req).then((data:any)=>{

        this.fillPromisesArrayOfFilesToSave();
        Promise.all(this.arrayPromises).then(data => {
          resolve(data);
        }, reason => {
          reject(reason);
        });

      }, (error:any)=>{
        reject(error);
      });

    });
  }//end uploadFile


  private fillPromisesArrayOfFilesToSave(){
    this.arrayFiles.forEach((file:any)=>{
      this.arrayPromises.push(  this.transferUloadedFileToS3(file) );
    });
  }//end fillPromisesArrayOfFilesToSave

}
