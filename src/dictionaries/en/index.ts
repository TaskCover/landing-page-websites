import { CommonLang } from "./common";
import { AuthLang } from "./auth";
import { LayoutLang } from "./layout";
import { AccountLang } from "./account";
import { NS_AUTH, NS_COMMON, NS_LAYOUT, NS_ACCOUNT } from "constant/index";

export default {
  [NS_COMMON]: CommonLang,
  [NS_AUTH]: AuthLang,
  [NS_LAYOUT]: LayoutLang,
  [NS_ACCOUNT]: AccountLang,
};
