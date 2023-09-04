import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [availableCities, setAvailableCities] = useState([
    "Milano",
    "Torino",
    "Venezia",
  ]);
  const [userCities, setUserCities] = useState([]);
  const [message, setMessage] = useState("");

  const spinRoulette = () => {
    if (!userName) {
      setMessage("Please enter a name.");
      return;
    }

    if (userCities.some((userCity) => userCity.user === userName)) {
      setMessage("This user already got a city.");
      return;
    }

    if (availableCities.length === 0) {
      setMessage("All cities have been chosen.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableCities.length);
    const chosenCity = availableCities[randomIndex];

    // Update the lists of cities and user-city pairings
    setUserCities([...userCities, { user: userName, city: chosenCity }]);
    setAvailableCities((prevCities) =>
      prevCities.filter((city) => city !== chosenCity)
    );

    // Provide feedback to the user
    setMessage(`${userName} you got ${chosenCity}!`);

    // Clear the user's name from input
    setUserName("");
  };

  return (
    <div>
      <Head>
        <title>Choose Your City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-b from-pink-500 to-violet-500 w-full h-screen flex justify-center items-center">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl font-bold">Enter your name</h1>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            className="p-2 mt-4 border rounded-md"
          />
          <button
            onClick={spinRoulette}
            className="px-6 py-2 mt-4 text-white bg-pink-600 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Spin the Roulette
          </button>
        </div>

        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-center text-pink-700">
            {message}
          </h1>
        </div>
      </main>
    </div>
  );
}
