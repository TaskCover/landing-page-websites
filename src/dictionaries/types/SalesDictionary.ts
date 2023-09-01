export type SalesDictionary = {
  list: {
    title: string;
    head: {
      title: string;
    };
    filter: {
      decending: string;
      ascending: string;
    };
    action: {
      deal: string;
      export: string;
    };
    newDealForm: {
      title: string;
      dealName: string;
      dealMember: string;
      unit: string;
      owner: string;
      tags: string;
      submit: string;
    };
    table: {
      stage: string;
      pjRevenue: string;
      revenue: string;
      time: string;
      owner: string;
      probability: string;
      lastActivity: string;
    };
    stage: {
      lead: string;
      proposalSent: string;
      prospect: string;
      waitingApprove: string;
      negotiation: string;
    };
    exportView: {
      title: string;
      documentFormat: string;
      orientation: string;
      pagesize: string;
    };
  };
  detail: {
    tab: {
      assign: string;

      feed: string;
      service: string;
    };
    todoList: {
      title: string;
      addTodo: string;
      assign: string;
      dueDate: string;
      addNew: string;
    };
  };
};
