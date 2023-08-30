import { useNavigate } from "react-router-dom"

export default function Root() {
    const navugate = useNavigate();

    return (
        <>
            <main className="main">
                <button className="submit_main" type="submit" onClick={() => navugate('/login')}>
                    Выйти
                </button>
            </main>
            <div className='container_chat'>
                <div className="chanels_grup">
                    <div className="chanel_title">Каналы</div>
                    <div className="chanel_item active"># General</div>
                    <div className="chanel_item"># Random</div>
                </div>
                <div className="chat_name">
                    <div className="chat_title">Название чата</div>
                    <div>
                        <div>Admin: Hello</div>
                        <div>Admin: My name is vlad</div>
                    </div>
                    <div>
                        <form className="chat_form">
                            <input id="text"
                                name="text"
                                type="text"
                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                                className="chat_input"
                                autoComplete='off' />
                            <button className="chat_submit">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}