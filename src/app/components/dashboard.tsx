export default function Dashboard({ allUsers, allMoney }) {
  return (
    <div className="bg-white shadow-lg border-2 border-gray-800">
      {allUsers.map((usuarios) => {
        const userMoney = allMoney.find(
          (money) => money.userId === usuarios.id
        );
        return (
          <ul key={usuarios.id + "_ul"} className="flex">
            <li className="w-28 border-2 p-2 text-center">
              {usuarios.username}
            </li>
            <li
              className={`w-64 border-2 p-2 text-center text-white ${
                userMoney && userMoney.amount === 0
                  ? "bg-red-500"
                  : "bg-green-700"
              }`}
            >
              {userMoney && userMoney.amount !== 0
                ? "$" + userMoney.amount.toLocaleString()
                : "Asiste a la actividades split"}
            </li>
          </ul>
        );
      })}
    </div>
  );
}
