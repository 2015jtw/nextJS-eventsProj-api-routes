import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';
import NewsletterRegistration from '../components/input/newsletter-registration';

export default function FeaturedEventsPage(props){

    return(
        <div>
            <h1 className='center'>Featured Events Page</h1>

            <NewsletterRegistration/>
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