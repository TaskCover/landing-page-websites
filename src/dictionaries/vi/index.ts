import {
  NS_ACCOUNT,
  NS_AUTH,
  NS_COMMON,
  NS_COMPANY,
  NS_LAYOUT,
  NS_MANAGER,
  NS_PROJECT,
  NS_RESOURCE_PLANNING,
  NS_SALES,
  NS_CHAT_BOX,
  NS_DOCS,
  NS_TIME_TRACKING,
  NS_CHAT,
} from "constant/index";

import { AccountLang } from "./account";
import { AuthLang } from "./auth";
import { CommonLang } from "./common";
import { CompanyLang } from "./company";
import { LayoutLang } from "./layout";
import { ManagerLang } from "./manager";
import { ProjectLang } from "./project";
import { ResourcePlanning } from "./resourcePlanning";
import { salesLang } from "./sales";
import { TimeTrackingLang } from "./timetracking";
import { ChatBoxLang } from "./chatbox";
import { ChatLang } from "./chat";
import { DocsLang } from "./docs";

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
  [NS_RESOURCE_PLANNING]: ResourcePlanning,
  [NS_CHAT]: ChatLang,
  [NS_CHAT_BOX]: ChatBoxLang,
  [NS_DOCS]: DocsLang,
};
