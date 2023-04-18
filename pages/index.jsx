import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';

export default function FeaturedEventsPage(props){

    return(
        <div>
            <h1>Featured Events Page</h1>

            <EventList items={props.featuredEvents} />

            
        </div>
    )
}


export async function getStaticProps(context){

    const featuredEvents = await getFeaturedEvents();
    

    return{
        props: {
            featuredEvents: featuredEvents
        },
        revalidate: 1800
    }

}