import "../css/login.css";
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Login() {
    const initialValues = {
        login: '',
        password: ''
    };
    const shema = yup.object().shape({
        login: yup.string().max(15, 'Must be 15 characters or less'),
        password: yup.string().required('No password provided.')
            .min(4, 'Password is too short - should be 8 chars minimum.')
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
            shema.isValid(values).then((valid) => console.log(valid));
            //alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit} className="form">
                <h1 className="form_title">Вход</h1>
                <div className="form_input m_top_100">
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
                <div className="form_input">
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
                </div>
                <div className="submit_item">
                    <button type="submit" className="submit">Submit</button>
                </div>

            </form>
        </div>
    )
}
