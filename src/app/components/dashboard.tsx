export default function Dashboard({data}:any){
    return(
    <div className="ml-48 p-4 grow">
    <ul id="listnav">
    {data.map((player:any) => (
     <li key={player.Id}>
      <ul key={player.Id + player.name} className="flex gap-2" id="listcenter">
      <li className="text-lx w-80"><strong>Id:</strong>{player.Id}<br/></li>
     <li className="w-52"><strong>Nombre:</strong>{player.Name}<br /></li>
     <li><strong className="w-52">Saldo:</strong>$0<br /></li>
      </ul>
    </li>
    ))
    }
    </ul>
    </div>
    )
}