export type DocsDictionary = {
   title : string
   button: {
      add: string
   },
   filter: {
      all : string,
      fields  : string,
      search: string
      group : {
         group: string,
         none : string,
         creator : string,
         project : string,
      },
      filter: {
         filter: string
         creator : string,
         lastEdited : string,
         name : string,
         project : string,
         projectStatus : string,
      }
   }
};
  