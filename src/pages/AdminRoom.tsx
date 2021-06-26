import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answeredImg from '../assets/images/answer.svg'

import '../styles/room.scss'

import { RoomCode } from '../components/RoomCode'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { useRoom } from '../hooks/useRoom'

type roomParams = {
    id: string;
}


export function AdminRoom(){
    const {user}= useAuth()

    const history = useHistory()
    const params = useParams<roomParams>();
    const roomId = params.id;

    const {title,questions} = useRoom(roomId)

    async function handleDeleteQuestion(questionId:string){
        if(window.confirm('Tem certeza que deseja excluir a pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleHighLightQuestion(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted:true
        });
    }

    async function handleCheckQuestionAsAswered(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true
        });
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({endedAt:new Date(),})

        history.push('/');
    }


    return(
        <div id="page-room">
            <header>
                <div className ="content">
                    <img src={logoImg} alt="Logo" />

                    <div>
                        <RoomCode code = {roomId}/>
                        <Button 
                            isOutlined
                            onClick = {handleEndRoom}
                        >
                            Encerrar Sala
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                <div className ='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className= "question-list">
                    {questions.map((question)=>{
                        return(
                            <Question
                                key = {question.id}
                                content = {question.content}
                                author ={question.author}
                                isAnswered = {question.isAnswered}
                                isHighlighted = {question.isHighLighted}
                            >
                            <button 
                                type='button'
                                onClick ={()=>handleDeleteQuestion(question.id)}>
                                <img src={deleteImg} alt="deletar pergunta" />
                            </button>

                            { !question.isAnswered && (
                                <>
                                    <button 
                                        type='button'
                                        onClick = {()=>handleHighLightQuestion(question.id)}>
                                        <img src={checkImg} alt="dar destaque" />
                                    </button>
                                    <button 
                                        type='button'
                                        onClick = {()=>handleCheckQuestionAsAswered(question.id)}>
                                        <img src={answeredImg} alt="Marcar como respondida" />
                                    </button>
                                </>
                            )}
                        

                            </Question>
                        )
                        
                    })}

                </div>

            </main>
        </div>
    )
}