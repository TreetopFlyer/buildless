import * as TW from "@twind/core@1.0.1";
import TWPreTail from "@twind/preset-tailwind@1.0.1";
import TWPreAuto from "@twind/preset-autoprefix@1.0.1";
import Preact from "preact";
import * as Store from "./store.js";
import People from "./people.js";

/** @type {TW.TwindUserConfig} */
const Configure = {
  theme: {},
  presets:
    /** @type {TW.Preset<TW.BaseTheme>[]} */ ([TWPreTail(), TWPreAuto()]),
};

const AtElement = document.querySelector("#app");
if (AtElement) {
  const ShadowDOM = AtElement.attachShadow({ mode: "open" });
  const ShadowDiv = document.createElement("div");
  const ShadowCSS = document.createElement("style");
  ShadowDOM.append(ShadowCSS);
  ShadowDOM.append(ShadowDiv);

  TW.observe(TW.twind(Configure, TW.cssom(ShadowCSS)), ShadowDiv);
  Preact.render(
    Preact.createElement(Store.Provider, {
      children: Preact.createElement(People, null),
    }),
    ShadowDiv,
  );
}
