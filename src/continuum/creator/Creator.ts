import { IDescriptorProduct } from "../../base/IDescriptorProduct";
import { Product } from "../../base/Product";
import { BBEvent } from "../../util/event/BBEvent";
import { IEvent } from "../../util/event/IEvent";
import { IConfigItem } from "../item/IConfigItem";
import { IArgumentEventCreation } from "./IArgumentEventCreation";
import { IConfigCreator } from "./IConfigCreator";
import { IConfigCreatorDom } from "./IConfigCreatorDom";
import { ICreator } from "./ICreator";

export abstract class Creator extends Product<IConfigCreatorDom> implements ICreator {
  public get OnCreation(): IEvent<IArgumentEventCreation> {
    return this.onCreation;
  }

  protected element: JQuery;

  protected onCreation: IEvent<IArgumentEventCreation> = new BBEvent<IArgumentEventCreation>();

  protected creationCounter = 0;
  protected descriptors: Array<IDescriptorProduct<IConfigItem>>;

  protected config: IConfigCreator;

  public Init(config: IConfigCreatorDom): void {
    this.config = config;
    this.descriptors = config.ItemDescriptors;
    if (!this.descriptors.length) {
      throw new Error("At least one ItemDescriptor must be provided in Creator config");
    }
    this.defineCreation();
  }

  protected abstract defineCreation(): void;
}
