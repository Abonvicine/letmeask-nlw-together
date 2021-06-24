import copyImg from '../assets/images/copy.svg'
import "../styles/roomcode.scss"


type roomCodeProps = {
    code: string;
}
export function RoomCode(props:roomCodeProps){
    function copyCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button onClick = {copyCodeToClipboard} className="room-code">
            <div>
                <img src={copyImg} alt="Copy room Code" />
            </div>
            <span>Sala {props.code}</span>
        </button>
    )
}