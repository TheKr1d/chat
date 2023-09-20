import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { addChanels } from "../store/chanelsSlice";
import { addMessage } from "../store/messagesSlice";
import { getToken_LS } from "../utils/localStorage";
import { responceSocket } from "../store/asyncRequests";
import Messages from '../components/messages';
import Channels from "../components/cannels";
import MessageForm from "../components/chatForm";




export default function Root() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(responceSocket());
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