import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export const useApp = () => {
  return useContext(AppContext);
};
