import { CommonLang } from "./common";
import { AuthLang } from "./auth";
import { LayoutLang } from "./layout";
import { AccountLang } from "./account";
import { ProjectLang } from "./project";
import { CompanyLang } from "./company";
import { ManagerLang } from "./manager";
import {
  NS_AUTH,
  NS_COMMON,
  NS_LAYOUT,
  NS_ACCOUNT,
  NS_PROJECT,
  NS_COMPANY,
  NS_MANAGER,
} from "constant/index";

export default {
  [NS_COMMON]: CommonLang,
  [NS_AUTH]: AuthLang,
  [NS_LAYOUT]: LayoutLang,
  [NS_ACCOUNT]: AccountLang,
  [NS_PROJECT]: ProjectLang,
  [NS_COMPANY]: CompanyLang,
  [NS_MANAGER]: ManagerLang,
};
