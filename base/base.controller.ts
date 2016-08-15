import { Response } from "express";
module.exports = {
  handleService: function (res: Response, service: Promise<any>) {
    service.then(
      (result: any)=> {
        this.okResult(res, result);
      },
      (error: any)=> {
        this.handleError(res, error);
      }
    );
  },
  okResult: function (res: Response, result: any) {
    res.json(result);
  },
  handleError: function (res: Response, error: any): void {
    res.status(500).json({message: error.message});
  }
};
