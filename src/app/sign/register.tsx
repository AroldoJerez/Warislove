"use client"
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function Signup({data}:any) {

    const [username,setUsername] = useState("");
    const [isUserValid, setIsUserValid] = useState(false);

    useEffect(() => {
        if (username && Array.isArray(data)) {
            const userExists = data.some(member => member.Name.toLowerCase() === username.toLowerCase());
            setIsUserValid(userExists);
        } else {
            setIsUserValid(false);
        }
    }, [username, data]);


    return (
        <>
        <NavBar></NavBar>
        <main className="flex justify-center items-center h-screen">
            
            <div className="flex flex-col w-max p-2 bg-white shadow-black shadow-md">
                <form className="flex flex-col" id="formsignup">
                    <input
                        placeholder="Usuario de Albion"
                        type="text"
                        className="mb-2 p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input placeholder="W A R I S L O V E" type="text" className={`mb-2 p-2 font-semibold text-center cursor-pointer  ${isUserValid ? 'placeholder:text-green-600' : 'placeholder:text-red-600'}`} readOnly />
                    <input placeholder="Correo" type="email" className="mb-2 p-2" />
                    <input placeholder="Contraseña" type="password" className="mb-2 p-2" />
                    <button type="button" className="pt-2 p-2 bg-blue-500 text-white">Registrar</button>
                </form>
                {username && (
                    <div className={`mt-2 text-center ${isUserValid ? 'text-green-600' : 'text-red-600'}`}>
                        {isUserValid ? 'Usuario válido' : 'Usuario no encontrado'}
                    </div>
                )}
            </div>
        </main>
        </>
    );
}
