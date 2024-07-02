// src/utils/guildUtils.ts

// esto me devuelve usando fetchGuildData.then(data=>data) <== los valores del setup

export async function fetchGuildData() {
  try {
    const response = await fetch("/api/dataGuild"); // Asegúrate de que la URL sea correcta
    if (!response.ok) {
      throw new Error("Error al obtener datos del gremio");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos del gremio:", error);
    throw error;
  }
}
