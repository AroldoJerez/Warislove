// src/utils/guildUtils.ts
// Pasando el nombre de un usuario obtengo los datos desde la api de albion

export async function getUserData(username) {
  try {
    const res = await fetch(
      "https://gameinfo.albiononline.com/api/gameinfo/guilds/4ZOavdN2RyqcUGw-yG-v8w/members"
    );
    const data = await res.json();
    const user = data.find(
      (member) => member.Name.toLowerCase() === username.toLowerCase()
    );
    if (user) {
      return user;
    } else {
      return { error: "User not found in Albion guild" };
    }
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}
