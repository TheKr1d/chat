import "../css/login.css";
import { useFormik } from 'formik';
import axios from "axios";
import { useState } from "react";
import cn from 'classnames';
import * as yup from 'yup';

export default function Login() {
    axios.post('/api/v1/login', { username: 'admin', password: 'admin' })
    .then((response) => {
        console.log(response.data);
      })
    .catch((err) => {
        return;
    })
    const [isErrors, setIsErrors] = useState(false);

    const initialValues = {
        login: '',
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
            schema.validate(values)
                .then((logAndPass) => {
                    setIsErrors(false);
                })
                .catch(() => {
                    setIsErrors(true);
                })

        }
    });

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit} className="form">
                <h1 className="form_title">Вход</h1>
                <div className={cn('form_input m_top_100', isErrors ? 'invalid' : null)}>
                    <label htmlFor="login" className="input_lebel">Login</label>
                    <input
                        id="login"
                        name="login"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.login}
                        className="input_item"
                        placeholder="Lion"
                    />
                </div>
                <div className={cn('form_input', isErrors ? 'invalid' : null)}>
                    <label htmlFor="login" className="input_lebel">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="input_item"
                        placeholder="******"
                    />
                    {isErrors ? <div className="feedback">Неверный логин или пароль.</div> : null}
                </div>
                <div className="submit_item">
                    <button type="submit" className="submit">Submit</button>
                </div>

            </form>
        </div>
    )
}
