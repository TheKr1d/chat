import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { addChanels } from "../store/chanelsSlice";
import { addMessage } from "../store/messagesSlice";
import { getToken_LS } from "../utils/localStorage";
import Messages from '../components/messages';
import Channels from "../components/cannels";
import MessageForm from "../components/chatForm";




export default function Root() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/v1/data', {
            headers: {
                Authorization: `Bearer ${getToken_LS()}`,
            },
        })
            .then((response) => {
                const { channels, currentChannelId } = response.data;
                dispatch(addChanels({ channels, currentChannelId }));
                //console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
            })
    }, [dispatch])




    const currentChannel = useSelector((state) => state.chanels.currentChannel);
    const initialValues = { text: '' };
    const formik = useFormik({
        initialValues,
        onSubmit: ({ text }, { resetForm }) => {
            dispatch(addMessage(text))
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
                    {<MessageForm formik={formik}/>}
                </div>
            </div>
        </>
    )
}