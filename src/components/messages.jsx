import Message from "./message"

export default function Messages({message}) {
    return message.map((data) => <Message key={data.id} message={data}/>)
}