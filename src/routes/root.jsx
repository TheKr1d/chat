import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from 'formik';
import { addMessage } from "../store/messagesSlice";
import { responceSocket, sendMessage } from "../store/asyncRequests";
import Messages from '../components/messages';
import Channels from "../components/cannels";
import MessageForm from "../components/chatForm";
import { socket } from "../store/asyncRequests";
import { getUsername_LS } from "../utils/localStorage";


export default function Root() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(responceSocket());
    }, [dispatch])


    useEffect(() => {
        socket.on('newMessage', (payload) => {
            //console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
            dispatch(addMessage(payload.body));
        });
    }, [dispatch])




    const currentChannel = useSelector((state) => state.chanels.currentChannel);
    const initialValues = { text: '' };
    const formik = useFormik({
        initialValues,
        onSubmit: ({ text }, { resetForm }) => {
            //dispatch(addMessage(text));
            sendMessage({ "body": text, channelId: currentChannel.id, username: getUsername_LS() })
            resetForm(initialValues);
        }
    })



    return (
        <>
            <main className="main">
                <button className="submit_main" onClick={() => navigate('/login')}>
                    Выйти
                </button>
            </main>
            <div className='container_chat'>
                {<Channels />}
                <div className="chat">
                    <div className="chat_title"># {currentChannel.name}</div>
                    {<Messages />}
                    {<MessageForm formik={formik} />}
                </div>
            </div>
        </>
    )
}