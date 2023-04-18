import { useRouter } from "next/router"
import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/UI/button";
import ErrorAlert from "../../components/UI/error-alert";

export default function FilteredEventsPage(props){

    const router = useRouter();

    if(props.hasError){
        return(
            <Fragment>
                <ErrorAlert>
                    <p className="center">Invalid Filter. Please adjust values.</p>
                </ErrorAlert>
                
                <div className="center">
                    <Button link='/events'>Show all Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = props.filteredEvents

    if(!filteredEvents || filteredEvents.length === 0){
        return(
            <Fragment>
                <ErrorAlert>
                    <p className="center">No events found.</p>
                </ErrorAlert>
                
                <div className="center">
                    <Button link='/events'>Show all Events</Button>
                </div>
                
            </Fragment>
        )
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return(
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

export async function getServerSideProps(context){

    const {params} = context;
    const filteredData = params.slug;

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(!filteredData){
        return(
            <p className="center">Loading...</p>
        )
    }

    if(isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12 || numYear < 2021 || numYear > 2030){
        return{
            props: { hasError: true}
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    return{
        props: {
            filteredEvents: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
}