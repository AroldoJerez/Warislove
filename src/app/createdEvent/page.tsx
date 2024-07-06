import Sidebar from "../components/Sidebar";
import FormCreatedEvent from "../components/formCreatedEvent";

export default function createdEvent() {
  return (
    <>
      <Sidebar />
      <main className="flex justify-center items-center h-screen">
        <FormCreatedEvent />
      </main>
    </>
  );
}
