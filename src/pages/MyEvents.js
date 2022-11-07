import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const MyEvents = () => {
   const { user, logout } = useContext(AuthContext);
   const [events, setEvents] = useState([]);

   useEffect(() => {
      fetch(`http://localhost:5000/perticipate?email=${user?.email}`, {
         headers: {
            authorization: `Bearer ${localStorage.getItem('eartCareToken')}`,
         },
      })
         .then((res) => {
            if (res.status === 401 || res.status === 403) {
               logout();
            }
            return res.json();
         })
         .then((data) => {
            setEvents(data);
         });
   }, [user?.email]);

   const handleDelete = (id) => {
      const confirmDelete = window.confirm('want to delete this item');
      if (confirmDelete) {
         fetch(`http://localhost:5000/perticipate/${id}`, {
            method: 'DELETE',
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.deletedCount > 0) {
                  const remaining = events.filter((event) => event._id !== id);
                  setEvents(remaining);
                  alert('Delete successfull');
               }
               console.log(data);
            });
      }
   };
   const handleUpdateStatus = (id) => {
      fetch(`http://localhost:5000/perticipate/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json',
         },
         body: JSON.stringify({ status: 'Completed' }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
               const remaining = events.filter((event) => event._id !== id);
               const modified = events.find((event) => event._id === id);
               modified.status = 'Completed';
               setEvents([modified, ...remaining]);
            }
         });
   };

   console.log(events);
   return (
      <div>
         <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-gray-50 text-gray-800">
            <h2 className="text-xl font-semibold">Your cart</h2>
            <ul className="flex flex-col divide-y divide-gray-300">
               {events.map((event) => (
                  <li key={event._id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                     <div className="flex w-full space-x-2 sm:space-x-4">
                        <img
                           className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
                           src={event.img}
                           alt="Polaroid camera"
                        />
                        <div className="flex flex-col justify-between w-full pb-4">
                           <div className="flex justify-between w-full pb-2 space-x-2">
                              <div className="space-y-1">
                                 <h3 className="text-lg font-semibold leading-snug sm:pr-8">{event.event_name}</h3>
                                 <p className="text-sm text-gray-600">{event.userName}</p>
                              </div>
                           </div>
                           <div className="flex text-sm divide-x">
                              <button
                                 onClick={() => handleDelete(event._id)}
                                 type="button"
                                 className="flex items-center px-2 py-1 pl-0 space-x-1"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4 h-4 fill-current"
                                 >
                                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                    <rect width="32" height="200" x="168" y="216"></rect>
                                    <rect width="32" height="200" x="240" y="216"></rect>
                                    <rect width="32" height="200" x="312" y="216"></rect>
                                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                 </svg>
                                 <span>Remove</span>
                              </button>
                              <button
                                 onClick={() => handleUpdateStatus(event._id)}
                                 type="button"
                                 className="flex items-center px-2 py-1 pl-0 space-x-1"
                              >
                                 <span>{event?.status ? event.status : 'On progress'}</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>

            <div className="flex justify-end space-x-4">
               <button type="button" className="px-6 py-2 border rounded-md border-violet-600">
                  Back
                  <span className="sr-only sm:not-sr-only">to shop</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default MyEvents;
