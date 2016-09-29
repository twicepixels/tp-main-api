import { Request, Response } from "express";
import { Service } from "./base.service";

let parameters = require('../config/parameters');
const AWS = require('aws-sdk');

export class AWSService extends Service {

  protected awsBucket: any;

  constructor(req: Request, res: Response) {
    super(req, res);
    AWS.config = new AWS.Config();
    AWS.config.region = parameters.awsRegion;
    AWS.config.accessKeyId = parameters.awsAccessKeyId;
    AWS.config.secretAccessKey = parameters.awsSecretAccessKey;
  }

  public uploadFileToS3(fileData: any, fileName: any): Promise<any> {
    return new Promise((resolve: any, reject: any)=> {
      this.awsBucket = new AWS.S3();
      this.awsBucket.putObject({
        Key: fileName,
        Body: fileData,
        Bucket: parameters.awsBucket
      }, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }//end if
      });
    });
  }
}

