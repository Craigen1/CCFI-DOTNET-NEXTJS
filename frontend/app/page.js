import ManageMembers from "./components/ManageMembers";
import MembersMetrics from "./components/MembersMetrics";

export default function Home() {
  return (
    <div>
      <MembersMetrics />
      <ManageMembers />
    </div>
  );
}
