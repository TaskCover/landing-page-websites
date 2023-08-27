import { SALE_STAGE } from "constant/enums";

export const TEXT_STAGE_STATUS: { [key in SALE_STAGE]: string } = {
  [SALE_STAGE.LEAD]: "list.stage.lead",
  [SALE_STAGE.PROPOSAL_SENT]: "list.stage.proposalSent",
  [SALE_STAGE.PROSPECT]: "list.stage.prospect",
  [SALE_STAGE.WAITING_APPROVE]: "list.stage.waitingApprove",
  [SALE_STAGE.NEGOTIATION]: "list.stage.negotiation",
};

export const COLOR_STAGE_STATUS: { [key in SALE_STAGE]: string } = {
  [SALE_STAGE.LEAD]: "warning",
  [SALE_STAGE.PROPOSAL_SENT]: "info",
  [SALE_STAGE.PROSPECT]: "error",
  [SALE_STAGE.WAITING_APPROVE]: "success",
  [SALE_STAGE.NEGOTIATION]: "purple",
};
