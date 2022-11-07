import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
   const { img, name, _id } = event;
   return (
      <Link to={`/perticipate/${_id}`}>
         <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
            <img src={img} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
            <div className="flex flex-col justify-between p-6 space-y-8">
               <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-wide">{name}</h2>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default EventCard;
