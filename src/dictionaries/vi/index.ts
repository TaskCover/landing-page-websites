import { CommonLang } from "./common";
import { AuthLang } from "./auth";
import { LayoutLang } from "./layout";
import { AccountLang } from "./account";
import { ProjectLang } from "./project";
import { CompanyLang } from "./company";
import { ManagerLang } from "./manager";
import { TimeTrackingLang } from "./timetracking";
import { ChatBoxLang } from "./chatbox";

import {
  NS_AUTH,
  NS_COMMON,
  NS_LAYOUT,
  NS_ACCOUNT,
  NS_PROJECT,
  NS_COMPANY,
  NS_MANAGER,
  NS_TIME_TRACKING,
  NS_SALES,
  NS_CHAT_BOX
} from "constant/index";
import { salesLang } from "./sales";

export default {
  [NS_COMMON]: CommonLang,
  [NS_AUTH]: AuthLang,
  [NS_LAYOUT]: LayoutLang,
  [NS_ACCOUNT]: AccountLang,
  [NS_PROJECT]: ProjectLang,
  [NS_COMPANY]: CompanyLang,
  [NS_MANAGER]: ManagerLang,
  [NS_TIME_TRACKING]: TimeTrackingLang,
  [NS_SALES]: salesLang,
  [NS_CHAT_BOX]: ChatBoxLang,
};
