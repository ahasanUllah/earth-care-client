import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Perticipate = () => {
   const events = useLoaderData();
   const { _id, img, name } = events;

   const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const userName = form.name.value;
      const email = form.email.value;
      const phone = form.phone.value;
      const message = form.message.value;
      console.log(name, email, phone, message);
      const perticipates = {
         event: _id,
         event_name: name,
         userName,
         email,
         phone,
         message,
         img,
      };
      console.log(perticipates);
      fetch('http://localhost:5000/perticipate', {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
         body: JSON.stringify(perticipates),
      })
         .then((res) => res.json())
         .then((data) => console.log(data))
         .catch((error) => console.log(error));
   };
   return (
      <div>
         <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
               <div className="">
                  <div className="rounded-lg bg-white p-8 shadow-lg  lg:p-12">
                     <form onSubmit={handleSubmit} action="" className="space-y-4">
                        <div>
                           <label className="sr-only" htmlFor="name">
                              Name
                           </label>
                           <input
                              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                              placeholder="Name"
                              type="text"
                              id="name"
                           />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                           <div>
                              <label className="sr-only" htmlFor="email">
                                 Email
                              </label>
                              <input
                                 className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                 placeholder="Email address"
                                 type="email"
                                 id="email"
                              />
                           </div>

                           <div>
                              <label className="sr-only" htmlFor="phone">
                                 Phone
                              </label>
                              <input
                                 className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                 placeholder="Phone Number"
                                 type="tel"
                                 id="phone"
                              />
                           </div>
                        </div>

                        <div>
                           <label className="sr-only" htmlFor="message">
                              Message
                           </label>
                           <textarea
                              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                              placeholder="Message"
                              rows="8"
                              id="message"
                           ></textarea>
                        </div>

                        <div className="mt-4">
                           <button
                              type="submit"
                              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                           >
                              <span className="font-medium"> Participate </span>

                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="ml-3 h-5 w-5"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                 />
                              </svg>
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Perticipate;
