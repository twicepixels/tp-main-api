/**
 * Created by Gabriel on 19/10/2016.
 */
var watermarker = require('watermarker');
export class ImageUtils {
  public static createWaterMarker(imageData:any, waterMarkImage:any):any {
    var watermarked = watermarker.watermark({
      imageData: imageData,
      watermarkData: waterMarkImage
    });
    return watermarked;
  }

  public static resizeImage(imageData:any, width:number, height:number, quality:number):any {
    var resized = watermarker.resize({
      imageData: imageData,
      width: imageData,
      height: height,
      quality: quality
    });
    return resized;
  }
}
