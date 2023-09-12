import cn from 'classnames';
import { setActiveChanels } from "../store/chanelsSlice";
import { useDispatch } from "react-redux";

export default function Channel({data}) {
    const dispatch = useDispatch();
    return (
        <div
            id={data.id}
            className={cn("chanel_item", data.state)}
            onClick={() => dispatch(setActiveChanels(data.id))}
        >
            # {data.name}
        </div>
    )
}