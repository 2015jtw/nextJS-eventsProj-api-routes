import Link from 'next/link';
import classes from './event-item.module.css'
import Button from '../UI/button';
import DateIcon from '../Icons/date-icon'
import AddressIcon from '../Icons/address-icon'
import ArrowRightIcon from '../Icons/arrow-right-icon'


export default function EventItem(props){

    const {title, date, image, location, id} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const formattedAddress = location.replace(', ', '\n')

    const exploreLink = `/events/${id}`

    return(
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />
            <div className={classes.content}>
                <div>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}