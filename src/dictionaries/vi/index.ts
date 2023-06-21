import { CommonLang } from "./common";
import { AuthLang } from "./auth";
import { LayoutLang } from "./layout";
import { AccountLang } from "./account";
import { ProjectLang } from "./project";
import {
  NS_AUTH,
  NS_COMMON,
  NS_LAYOUT,
  NS_ACCOUNT,
  NS_PROJECT,
} from "constant/index";

export default {
  [NS_COMMON]: CommonLang,
  [NS_AUTH]: AuthLang,
  [NS_LAYOUT]: LayoutLang,
  [NS_ACCOUNT]: AccountLang,
  [NS_PROJECT]: ProjectLang,
};
