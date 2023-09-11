import cn from 'classnames';

export default function Channel({data}) {
    return (
        <div
            id={data.id}
            className={cn("chanel_item", data.state)}
            //onClick={() => setStateGroup(id)}
        >
            # {data.name}
        </div>
    )
}