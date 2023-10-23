export default function Message({message}) {
    
    return <div><b>{message.username}</b>: {message.body}</div>
}