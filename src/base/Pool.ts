import Factory from "./Factory";
import IPool from "./IPool";
import IProductConfig from "./IProductConfig";
import IProductReusable from "./IProductReusable";

export default abstract class Pool<TConfig extends IProductConfig, TProduct extends IProductReusable<TConfig>>
  extends Factory<TConfig, TProduct>
  implements IPool<TConfig, TProduct> {
  public get CanProvide(): boolean {
    return this.poolActive.size < this.Limit;
  }

  public get Limit(): number {
    return this.limit;
  }

  public set Limit(value: number) {
    if (!!this.poolActive.size || !!this.poolPassive.length) {
      throw new Error("Pool limit can only be set before the first use of Provide");
    }
    if (value < 1) {
      throw new Error(`Limit minimum is 1, received value: ${value}`);
    }
    this.limit = Math.floor(value);
  }

  protected limit: number = 10;

  protected poolActive: Map<string, TProduct> = new Map<string, TProduct>();
  protected poolPassive: TProduct[] = [];

  public Provide(name: string): TProduct {
    if (!this.CanProvide) {
      throw new Error("This Pool cannot provide more Product, deactivate some");
    }
    let product: TProduct;
    if (!!this.poolPassive.length) {
      product = this.poolPassive.pop();
    } else {
      product = super.Provide(name);
    }
    product.Activate(this.createDeActivator(product));
    return product;
  }

  protected createDeActivator(product: TProduct): () => void {
    return ((key: string) => () => {
      const prod: TProduct = this.poolActive.get(key);
      if (!!prod) {
        throw new Error(`The Product has already been de-activated: ${key}`);
      }
      this.poolActive.delete(prod.GUId);
      prod.Deactivate();
      this.poolPassive.push(prod);
    })(product.GUId);
  }
}
