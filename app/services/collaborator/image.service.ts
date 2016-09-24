import { Request, Response } from "express";
import {AWSService} from "../../../base/aws.service";
const _fileSystem = require('fs');

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


  private transferUloadedFileToS3(file:any):Promise<any>{
    return new Promise((resolve: any, reject: any)=> {
      _fileSystem.readFile(file.path, (err:any, data:any) => {
        if (err) {
          reject(err);
        }else{
          let imageTag = file.path.substr(file.path.indexOf("_")+1, file.path.length)+"-";
          this.uploadFileToS3(data, imageTag+file.name).then((data:any)=>{
            let image:any = {};
            image['typeId'] = 1;
            image['description'] = imageTag+file.name;
            this.create(image).then((result:any)=>{
              resolve(result);
            },(error:any)=>{
              reject(error);
            });
          },(error:any)=>{
            reject(error);
          });
        }//end if
      });
    });
  }

  public create(data: any): Promise<any> {
    return this.Models.Image.create(data);
  }

}
