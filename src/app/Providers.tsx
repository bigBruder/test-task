"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import { PropsWithChildren } from "react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
