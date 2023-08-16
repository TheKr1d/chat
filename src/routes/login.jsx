import "../css/login.css";
import { useFormik } from 'formik';

export default function Login() {
    const initialValues = {
        login: '',
        password: ''
    };
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    //alert(JSON.stringify(values, null, 2));
    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit} className="form">
                <label htmlFor="login">Login</label>
                <input
                    id="login"
                    name="login"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.login}
                />
                <label htmlFor="login">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}
