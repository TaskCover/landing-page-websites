import Wrapper from "components/Wrapper";
 import { TabList, Timeline } from "components/sn-resource-planing";

 export const metadata = {
   title: "Time tracking | Taskcover",
 };

 export default function Page() {
   return (
     <Wrapper overflow="auto">
       <TabList />
       <Timeline />
     </Wrapper>
   );
 }