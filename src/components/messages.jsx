import Message from "./message";
import { useSelector } from "react-redux";

export default function Messages() {
    const messages = useSelector((state) => state.messages.messages);
    return (
        <div>
            {messages.map((data) => <Message key={data.id} message={data}/>)}
        </div>
    )
}