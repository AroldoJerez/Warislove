import FormCreatedEvent from "@/app/components/formCreatedEvent";
import Sidebar from "@/app/components/Sidebar";

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
