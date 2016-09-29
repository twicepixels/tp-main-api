import { Request, Response } from "express";
import { AWSService } from "../../../base/aws.service";
const _fileSystem = require('fs');

export class ImageService extends AWSService {

  protected arrayPromises: Array<Promise<any>> = [];

  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public uploadFiles(): Promise<any> {
    return new Promise((resolve: any, reject: any)=> {
      this.upload(true).then((data: Array<any>)=> {
        this.fillPromisesArrayOfFilesToSave(data);
        Promise.all(this.arrayPromises).then(
          data => resolve(data),
          reason => reject(reason)
        );
      }, (error: any)=> reject(error));
    });
  }//end uploadFile

  private fillPromisesArrayOfFilesToSave(data: Array<any>) {
    data.forEach((file: any)=> {
      let x = this.transferFileToS3(file);
      this.arrayPromises.push(x);
    });
  }//end fillPromisesArrayOfFilesToSave

  private transferFileToS3(file: any): Promise<any> {
    return new Promise((resolve: any, reject: any)=> {
      _fileSystem.readFile(file.path, (error: any, data: any) => {
        if (error) {
          reject(error);
        } else {
          let imageTag = file.path.substr(file.path.indexOf("_") + 1, file.path.length) + "-";
          this.uploadFileToS3(data, imageTag + file.name).then(()=> {
            this.Models.Image.create({
              typeId: 1,
              description: imageTag + file.name
            }).then((result: any)=> {
              // TODO: remove tmp file
              resolve(result);
            }, (error: any)=> reject(error));
          }, (error: any)=> reject(error));
        }//end if
      });
    });
  }
}
