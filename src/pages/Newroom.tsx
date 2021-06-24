import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from "../assets/images/logo.svg"
//notação do webpack(estudar depois!)
//module bundler -> ...
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

export function Newroom(){
    
    const [newRoom, setNewRoom] = useState("")
    const {user} = useAuth()
    const history = useHistory()
    
    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();

        console.log(newRoom);

        if (newRoom.trim() === '' ){
            return;
        };

        const roomRef = database.ref("rooms");
        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return(
        <div id = "page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração de troca de pergunta" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content ">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da Sala"
                            onChange = {(event)=> setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar Sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}