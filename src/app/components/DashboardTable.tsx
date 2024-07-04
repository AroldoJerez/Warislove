export default function DashboardTable({ data }: any) {
  return (
    <div className="ml-48 p-4 grow flex justify-center">
      <ul id="listnav">
        {data.map((player: any) => (
          <li key={player.Id}>
            <ul
              key={player.Id + player.name}
              className="flex gap-2"
              id="listcenter"
            >
              <li className="text-lx w-80">
                <strong>Id:</strong>
                {player.Id}
                <br />
              </li>
              <li className="w-52">
                <strong>Nombre:</strong>
                {player.Name}
                <br />
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
