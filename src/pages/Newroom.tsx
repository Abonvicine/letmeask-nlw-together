import { Link } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from "../assets/images/logo.svg"
//notação do webpack(estudar depois!)
//module bundler -> ...
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function Newroom(){

    //const {user} = useAuth()

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
                    <form>
                        <input 
                            type="text" 
                            placeholder="Nome da Sala"
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