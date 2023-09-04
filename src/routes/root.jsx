import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import cn from 'classnames';
import _ from "lodash";
import { getUsername_LS } from "../utils/localStorage";
import { useState } from "react";

export default function Root() {
    const testGroup = [{
        name: "General",
        id: _.uniqueId(),
        state: "active"
    },
    {
        name: "Random",
        id: _.uniqueId(),
        state: null
    }];
    const [message, setMessage] = useState([]);

    const addMessage = (data) => {
        setMessage([...message, data]);
    };

    const [group, setGroup] = useState(testGroup);

    const setStateGroup = (id) => { 
        const newGroup = group.map((item) => item.id === id ? {...item, state: 'active'} : {...item, state: null});
        setGroup(newGroup);
    }

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
                    {group.map(({ name, id, state }) =>
                        <div
                            key={id}
                            id={id}
                            className={cn("chanel_item", state)}
                            onClick={() => setStateGroup(id)}
                        >
                            # {name}
                        </div>)}
                </div>
                <div className="chat_name">
                    <div className="chat_title">Название чата</div>
                    <div>
                        {message.map(({ username, text, id }) => {
                            return <div key={id}><b>{username}</b>: {text}</div>;
                        })}
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