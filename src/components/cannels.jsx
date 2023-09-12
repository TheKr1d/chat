import { useSelector } from "react-redux";
import Channel from "./channel";

export default function Channels() {
    const channels = useSelector((state) => state.chanels.chanels);
    return (
        <div className="chanels_grup">
            <div className="chanel_title">Каналы</div>
            {channels.map((item) => <Channel key={item.id} data={item}/>)}
        </div>
    )
}