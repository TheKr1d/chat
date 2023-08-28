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
                    <div className="chanel_item"># General</div>
                    <div className="chanel_item"># Random</div>
                </div>
                <div className="chat_name">
                    Название чата
                </div>

                {/* <p>Root</p>
                <div>
                <a href={`/login`}>Your Name</a>
                </div> */}
            </div>
        </>
    )
}