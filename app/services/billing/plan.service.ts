/**
 * Created by Juanjo on 19/08/2016.
 */

import {BillingService} from "./billing.service";

export class PlanService extends BillingService {

  public getPlans():Promise<any> {
    let _service = this;
    return new Promise((resolve:any, reject:any)=> {
      //_service.getBillingId(accountId).then(
      //(billingId: string)=> {
      _service.billingAPI.plans.list().then(
        (result:any)=>resolve(result),
        (error:any)=>reject(error)
      );
      //}, (error: any)=>reject(error)
      //);
    });
  }

  public create(data: any): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      //obtiene la descripcion del intervalo, se necesita para enviarla a stripe
      _service.Models.Catalog.find({where: {catalogId: data.intervalId }}).then((dataCat: any) => {
        let interval = dataCat.description ;

        //guarda en base de datos
        _service.Models.Package.create(data).then(
          (customerPackage: any)=> {
            //guarda en stripe
            _service.billingAPI.plans.create({
              amount: customerPackage.amount ,
              interval: interval ,
              name: customerPackage.name ,
              currency: customerPackage.currency ,
              id: customerPackage.name,
              interval_count: customerPackage.interval_count

            }).then(
              (result:any)=>resolve(result),
              (error: any)=> {
                //_service.deleteById(customerPackage.id);
                this.deleteByIdDB(customerPackage.id);
                reject(error);
              }
            );
          },
          (error: any)=>reject(error)
        );

      }, (reason: string) => {
        console.log(reason);
      },
        (error: any)=>reject(error));
    });
  }

  public update(id: number, data: any): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      //obtiene la descripcion del intervalo, se necesita para enviarla a stripe
      _service.Models.Catalog.find({where: {catalogId: data.intervalId }}).then((dataCat: any) => {
          let interval = dataCat.description ;

          //actualiza en base de datos
        this.updateByIdDB(id,data).then(
            (customerPackage: any)=> {
              //guarda en stripe
              _service.billingAPI.plans.update(id,
                {
                amount: customerPackage.amount ,
                interval: interval ,
                name: customerPackage.name ,
                currency: customerPackage.currency ,
                interval_count: customerPackage.interval_count
              }).then(
                (result:any)=>resolve(result),
                (error: any)=> {
                  //_service.deleteById(customerPackage.id);
                  //this.deleteByIdDB(customerPackage.id);
                  reject(error);
                }
              );
            },
            (error: any)=>reject(error)
          );

        }, (reason: string) => {
          console.log(reason);
        },
        (error: any)=>reject(error));
    });
  }

  public delete(id: number): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
          //elimina en base de datos
          this.deleteByIdDB(id).then(
            (result: any)=> {
              //elimina en stripe
              _service.billingAPI.plans.del(id).then(
                (result:any)=>resolve(result),
                (error: any)=> {
                  reject(error);
                }
              );
            },
            (error: any)=>reject(error)
          );


    });
  }


  /*
  Eliminar plan en la base de datos
   */
  public deleteByIdDB(id: number): Promise<any> {
    return this.Models.Package.destroy({where: {"id": id}});
  }

  /*
   Actualizar plan en la base de datos
   */
  public updateByIdDB(id: number, data: any): Promise<any> {
    return this.Models.Package.update(data, {where: {"id": id}});
  }

  /*
   Obtener plan de la base de datos
   */
  public getByIdDB(id: number): Promise<any> {
    return this.Models.Package.find({where: {"id": id}});
  }



}
