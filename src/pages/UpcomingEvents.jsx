import React from 'react';
import UpcomingEvents from '../components/home/UpcomingEvents';
import SEO from '../components/common/SEO';

const UpcomingEventsPage = () => {
    return (
        <>
            <SEO
                title="Upcoming Events - Holy Spirit Academy of Bangued"
                description="Join us for our upcoming events and activities. Mark your calendars!"
                keywords="events, calendar, school activities, schedule"
            />
            {/* Wrapper with padding to account for fixed navbar, though the component has its own top padding, 
                we might need a bit of background continuity or just let the component handle it if it fits. 
                The component has py-24, which is effectively 6rem top/bottom. 
                Navbar is usually h-16 or h-20. 
                So just mounting it should work if the background matches.
            */}
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
                <UpcomingEvents />
            </div>
        </>
    );
};

export default UpcomingEventsPage;
