import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EventButton() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEventStatus = async () => {
      try {
        const response = await fetch("/api/evento/status"); // Ajusta el endpoint según sea necesario
        if (response.ok) {
          const data = await response.json();
          setIsActive(data.actived);
        }
      } catch (error) {
        console.error("Error fetching event status:", error);
      }
    };

    fetchEventStatus();
  }, []);

  const handleClick = () => {
    router.push("/evento");
  };

  if (!isActive) {
    return null; // No renderizar el botón si no hay eventos activos
  }

  return (
    <button
      onClick={handleClick}
      className="absolute right-0 bottom-0 flex flex-col items-end p-10 animate-pulse hover:animate-none"
    >
      <div className="relative right-10 top-8 z-10 bg-red-500 w-24 shadow-sm shadow-black">
        <p className="text-white text-center">Evento...</p>
      </div>
      <div className="relative box-border rounded-full bg-orange-500 h-24 w-24 p-4 border-2">
        <p className="text-xl text-white flex items-center justify-center h-full">
          1
        </p>
      </div>
    </button>
  );
}
