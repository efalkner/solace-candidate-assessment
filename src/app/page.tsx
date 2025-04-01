"use client";

import { useEffect, useState } from "react";

export default function Home() {
  interface Advocate {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: string;
    id: number;
    }

  const LOADING_STATES = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error",
  }
  
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [status, setStatus] = useState<string>(LOADING_STATES.LOADING);

  useEffect(() => {
    fetch("/api/advocates")
      .then((response) => { 
        if (response.ok) {
          setStatus(LOADING_STATES.LOADED);
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })  
      .then((jsonResponse) => {
        if (jsonResponse.data.length !== 0) {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
        }
      }).catch((error) => {
        setStatus(LOADING_STATES.ERROR);
      });
  }, []);

  const filterAdvocates = (searchTerm: string) => {
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm)) ||
        advocate.yearsOfExperience.toString().includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm)
      );
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value ? e.target.value.toLowerCase() : "";
    setFilteredAdvocates(filterAdvocates(searchTerm));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const sanitizedValue = e.currentTarget.value.toLowerCase();
    if (e.key === "Enter") {
      setFilteredAdvocates(filterAdvocates(sanitizedValue));
    } else if (e.key === "Tab") {
      setFilteredAdvocates(filterAdvocates(sanitizedValue));
    }
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div >
        <form className="flex items-center space-x-1">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="fill-slate-300 h-5 w-5" aria-hidden="true" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 sm:text-sm" placeholder="Search advocates" onChange={onChange} onKeyDown={handleKeyPress}/>
        </div>
        <button className="bg-transparent text-slate-700 font-semibold hover:text-sky-500 hover:bg-transparent hover:border-sky-500 rounded-md py-2 px-4 border border-slate-300 rounded-md" onClick={onClick}>Reset search</button>
        </form>
      </div>
      <br />
      <br />
      {status === LOADING_STATES.LOADING &&
        <div className="text-center">
          <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
        </div> 
      || status === LOADING_STATES.ERROR && <p className="text-center bg-white text-red-500">Error fetching advocates</p> ||
      status === LOADING_STATES.LOADED &&
          <table className="w-full table-auto border-collapse border border-gray-400">
            <thead >
              <tr className="bg-gray-300 border-b border-gray-400">
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Degree</th>
                <th>Specialties</th>
                <th>Years of Experience</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map((advocate) => {
                return (
                  <tr className="odd:bg-white even:bg-gray-100 border-b border-gray-200 text-center" key={advocate.id}>
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                      {advocate.specialties.map((s, index) => (
                        <div key={index}>{s}</div>
                      ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      }
    </main>
  );
}
