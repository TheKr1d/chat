import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

import { useDispatch } from "react-redux";
import { addChanels } from "../store/chanelsSlice";
import _ from "lodash";
import { getUsername_LS, getToken_LS } from "../utils/localStorage";
import { useState, useEffect } from "react";
import axios from "axios";
import Messages from '../components/messages';
import Channels from "../components/cannels";

export default function Root() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/v1/data', {
            headers: {
              Authorization: `Bearer ${getToken_LS()}`,
            },
          })
          .then((response) => {
            const {channels} = response.data;
            const newChannels = channels.map((item) => item.name === 'general' ? {...item, state: 'active'} : {...item, state: null})
            dispatch(addChanels(newChannels));
            //console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
          })
    }, [dispatch])

    const [message, setMessage] = useState([]);
    const addMessage = (data) => {
        setMessage([...message, data]);
    };


    const navigate = useNavigate();
    const initialValues = { text: '' };
    const formik = useFormik({
        initialValues,
        onSubmit: ({ text }, { resetForm }) => {
            addMessage({
                text,
                "username": getUsername_LS(),
                "id": _.uniqueId()
            });
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
                <div className="chanels_grup">
                    <div className="chanel_title">Каналы</div>
                    {<Channels />
                    
                    
                    
                    /* {channels.map(({ name, id, state }, key) =>
                        <div
                            key={key}
                            id={id}
                            className={cn("chanel_item", state)}
                            onClick={() => setStateGroup(id)}
                        >
                            # {name}
                        </div>)} */}
                </div>
                <div className="chat_name">
                    <div className="chat_title">Название чата</div>
                    <div>
                        {<Messages message={message}/>}
                    </div>
                    <div>
                        <form className="chat_form" type="submit" onSubmit={formik.handleSubmit}>
                            <input id="text"
                                name="text"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.text}
                                className="chat_input"
                                autoComplete='off' />
                            <button type="submit" className="chat_submit">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}