export default function MessageForm({formik}) {
    return (
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
    )
}