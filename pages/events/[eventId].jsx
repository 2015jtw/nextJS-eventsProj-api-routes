import { Fragment } from 'react';
import { getEventById, getAllEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/UI/error-alert';

export default function EventDetailPage(props){

    const event = props.selectedEvent;

    if(!event){
        return(
            <ErrorAlert>
                <p>No Event Found</p>
            </ErrorAlert>
        )
    }

    return(
        <Fragment>
            <EventSummary
                title={event.title}
            />
            <EventLogistics
                location={event.location}
                date={event.date}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticProps(context){
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return{
        props:{
            selectedEvent: event
        },
        revalidate: 30
    }
}

export async function getStaticPaths(){

    const events = await getAllEvents();

    const paths = events.map((event) => {
        return{
            params: {
                eventId: event.id
            }
        }
    })

    return{
        paths: paths,
        fallback: 'blocking'
    }
}