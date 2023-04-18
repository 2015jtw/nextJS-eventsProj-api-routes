import EventItem from "./event-item"
import classes from './event-item.module.css'

export default function EventList(props){

    const {items} = props

    return(
        <ul className={classes.list}>
            {items.map(item => (
                <EventItem
                    id={item.id}
                    date={item.date}
                    title={item.title}
                    image={item.image}
                    location={item.location}
                    key={item.id}
                />
            )) }
        </ul>
    )
}