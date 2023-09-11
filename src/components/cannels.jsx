import { useSelector } from "react-redux";
import Channel from "./channel";

export default function Channels() {
    const channels = useSelector((state) => state.chanels.chanels);
    return (channels.map((item) => <Channel key={item.id} data={item}/>))
}