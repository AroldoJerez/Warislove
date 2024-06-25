import Signup from "./register";

async function getData() {
    try {
            const res = await fetch('https://gameinfo.albiononline.com/api/gameinfo/guilds/4ZOavdN2RyqcUGw-yG-v8w/members');
      return  res.json();
    } catch (error) {
      return { error: 'Failed to fetch data'} ;
    }
  }

export default async function pageSign(){
    const data = await getData();
    return(
        <>
        <Signup data={data}></Signup>
        </>
    )
}