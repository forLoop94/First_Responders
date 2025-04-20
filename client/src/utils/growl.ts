import { store } from "../redux/store";
import { addGrowl } from "../redux/growler/growlerSlice";
import { GrowlType } from "../redux/growler/growlerSlice";

export const growl = (message: string, type: GrowlType = "info") => {
  store.dispatch(addGrowl({ message, type }));
};
