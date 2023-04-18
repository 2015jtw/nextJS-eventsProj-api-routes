import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventSearch from '../../components/events/event-search';
import { Fragment } from "react";
import {useRouter} from "next/router";

export default function AllEventsPage(props){
    const router = useRouter();
    const allEvents = props.allEvents;

    function findEventsHandler(selectedYear, selectedMonth){

        const fullpath = `/events/${selectedYear}/${selectedMonth}`;
        router.push(fullpath);
    }

    return(
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={allEvents} />
        </Fragment>
    )
}

export async function getStaticProps(){
    const allEvents = await getAllEvents();

    return{
        props: {
            allEvents: allEvents
        },
        revalidate: 60
    }
}