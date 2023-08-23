import "../css/login.css";
import { useFormik } from 'formik';
import { useState } from "react";
import cn from 'classnames';
import * as yup from 'yup';

export default function Login() {
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
        // validationSchema: Yup.object({
        //     login: Yup.string().max(2, 'Must be 15 characters or less'),
        //     password: Yup.string().required('No password provided.')
        //         .min(8, 'Password is too short - should be 8 chars minimum.')
        //         .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        // }),
        onSubmit: values => {
            schema.validate(values)
                .then((logAndPass) => {
                    setIsErrors(false);
                    console.log(logAndPass)
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
