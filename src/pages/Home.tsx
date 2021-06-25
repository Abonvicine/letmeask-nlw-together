import {useHistory} from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"
//notação do webpack(estudar depois!)
//module bundler -> ...
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import {firebase, database} from '../services/firebase'

export function Home(){
    const history = useHistory()
    
    const {user,signInWithGoogle}= useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert("Esta sala não existe!");
            return;
        }

        if (!roomRef.exists()){
            alert("Sala não existente");
            return;
        }
        
        if (roomRef.val().endedAt){
            alert(`Esta sala foi encerrada em ${roomRef.val().endedAt}`)
            return;
        }
        history.push(`/rooms/${roomCode}`);
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
                    <button onClick ={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className = "separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange = {event => setRoomCode(event.target.value)}
                            value = {roomCode}
                        />
                        <Button type="submit">
                            Entre na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}