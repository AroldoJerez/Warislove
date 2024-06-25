
    async function getData() {
        const res = await fetch('https://gameinfo.albiononline.com/api/gameinfo/guilds/4ZOavdN2RyqcUGw-yG-v8w/members');
        try {
          return  res.json();
        } catch (error) {
          return { error: 'Failed to fetch data'} ;
        }
      }

export default async function sign(){
    const data = await getData();
//estoy intentando resolver el registro medianto la api de albion
    {data.map((info)=>{
        return console.log(info)
    })}

    return(
        <main>
            <div className="w-max h-auto p-2 bg-red-700" >
                <form className="flex flex-col">
                    <input placeholder="Usuario de Albion" type="text"></input>
                    <input placeholder="Warislove" type="text"></input>
                    <input placeholder="Correo" type="email"></input>
                    <input placeholder="Contraseña" type="password"></input>
                    <button>Registrar</button>
                </form>
            </div>
        </main>
    )
}