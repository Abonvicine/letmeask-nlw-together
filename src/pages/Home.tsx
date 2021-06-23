import {useHistory} from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"
//notação do webpack(estudar depois!)
//module bundler -> ...
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function Home(){
    const history = useHistory()
    
    const {user,signInWithGoogle}= useAuth()

    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new');
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
                    <form>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
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