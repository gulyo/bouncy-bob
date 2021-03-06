import { appConfig } from "../../../appConfig";
import { NameAbsorption } from "../../../continuum/absorption";
import { IConfigItem } from "../../../continuum/item/IConfigItem";
import { NameShape } from "../../../visualization/shape";
import { configShapeDomAlice } from "../../visulazitaion/shape/configShapeDomAlice";
import { configAbsorptionFullElastic } from "../absorption/configAbsorptionFullElastic";
import { configAbsorptionLinear } from "../absorption/configAbsorptionLinear";

export const configItem2dAlice: IConfigItem = {
  Absorptions: [
    { ClassName: NameAbsorption.FULL_ELASTIC, Config: configAbsorptionFullElastic },
    { ClassName: NameAbsorption.LINEAR, Config: configAbsorptionLinear },
  ],
  Visualizer: {
    ClassName: NameShape.ALICE_WORLD,
    Config: configShapeDomAlice,
  },
  VelocityInterval: [
    { Low: -250, High: 250 },
    { Low: -500, High: 500 },
  ],
  VelocityMinimum: [
    Number.NEGATIVE_INFINITY,
    configAbsorptionLinear.Constants.Coefficient * (1000 / appConfig.timeStep) * 1.1,
  ],
};
