import { useFormik } from 'formik';
import axios from "axios";
import { useState, useContext } from "react";
import cn from 'classnames';
import * as yup from 'yup';
import ThemeContext from "../context/themeContext";
import { setItem_LS, clear_LS } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const {logIn} = useContext(ThemeContext);

    clear_LS();



    const navigate = useNavigate();
    const [isErrors, setIsErrors] = useState(false);
    

    const initialValues = {
        username: '',
        password: ''
    };
    const schema = yup.object().shape({
        login: yup.string().max(15, 'Максимум 15 символов.'),
        password: yup.string().required('Пароль не введен')
            .min(4, 'Пароль слишком короткий - должен состоять минимум из 4 символов')
    })
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            schema
                .validate(values)
                .then((v) => {
                    setIsErrors(false);
                    axios.post('/api/v1/login', v)
                        .then((response) => {
                            setItem_LS(JSON.stringify(response.data));
                            logIn();
                            navigate('/');
                        })
                        .catch((err) => {
                            return;
                        })
                })
                .catch(() => {
                    setIsErrors(true);
                })

        }
    });

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit} className="form_login">
                <h1 className="form_title">Вход</h1>
                <div className={cn('form_input m_top_100', isErrors ? 'invalid' : null)}>
                    <label htmlFor="username" className="input_lebel">Login</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="input_item"
                        placeholder="Lion"
                        autoComplete='off'
                    />
                </div>
                <div className={cn('form_input', isErrors ? 'invalid' : null)}>
                    <label htmlFor="password" className="input_lebel">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="input_item"
                        placeholder="******"
                        autoComplete='off'
                    />
                    {isErrors ? <div className="feedback">Неверный логин или пароль.</div> : null}
                </div>
                <div className="submit_item">
                    <button type="submit" className="submit_login">Submit</button>
                </div>

            </form>
        </div>
    )
}
