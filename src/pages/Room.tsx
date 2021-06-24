import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
import { useParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type roomParams = {
    id: string;
}

export function Room(){
    const {user}= useAuth()
    const [newQuestion,setNewQuestion] = useState("");

    const params = useParams<roomParams>();
    const roomId = params.id;

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()
        
        if (newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error("Você deve estar logado para enviar perguntas")
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion("")
    }

    return(
        <div id="page-room">
            <header>
                <div className ="content">
                    <img src={logoImg} alt="Logo" />
                    <RoomCode code = {roomId}/>
                </div>
            </header>

            <main>
                <div className ='room-title'>
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar"
                        onChange={event=>setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className = 'user-info'>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta faça seu login 
                                <button> Faça seu login</button>.
                            </span>
                        ) }

                        <Button disabled = {!user} type="submit">
                            Enviar Pergunta
                        </Button>

                    </div>
                </form>
            </main>
        </div>
    )
}