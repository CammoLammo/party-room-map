"use client";

import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { GiStairs } from "react-icons/gi";
import { GiTigerHead } from "react-icons/gi";
import { GiMonkey } from "react-icons/gi";

interface Party {
    id: number;
    date: string;
    time: string;
    endTime: string;
    datetime: string;
    childName: string;
    room: string;
}

interface SectionData {
    section: string;
    party?: Party;
}

export default function PartyList() {
    const [parties, setParties] = useState<Party[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        async function fetchParties() {
            try {
                const getDate = currentTime.toISOString().split("T")[0];
                const response = await fetch(`/api/parties?date=${getDate}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch parties");
                }

                const data = await response.json();

                setParties(data.parties);
            } catch (error: unknown) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchParties();
    }, [currentTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    let room1: SectionData = { section: "Room 1" };
    let room2: SectionData = { section: "Room 2" };
    let room3: SectionData = { section: "Room 3" };
    let room4: SectionData = { section: "Room 4" };
    let room5: SectionData = { section: "Room 5" };

    parties.forEach((party) => {
        const startTime = new Date(party.datetime);
        const diffMins = (currentTime.getTime() - startTime.getTime()) / 60000;

        if (diffMins >= -15 && diffMins < 135) {
            if (party.room === "1") {
                room1 = { section: "Room 1", party: party };
            } else if (party.room === "2") {
                room2 = { section: "Room 2", party: party };
            } else if (party.room === "3") {
                room3 = { section: "Room 3", party: party };
            } else if (party.room === "4") {
                room4 = { section: "Room 4", party: party };
            } else if (party.room === "5") {
                room5 = { section: "Room 5", party: party };
            }
        }
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen grid grid-cols-2 font-bold text-2xl text-center text-wrap bg-black text-white">
            <div className="flex flex-row col-span-2 text-4xl">
                <div className="flex items-center justify-center m-4 p-2 rounded-lg w-full">
                    <FaArrowAltCircleLeft size={50} />
                    <p className="p-4">To the left</p>
                </div>
                <div className="flex items-center justify-center m-4 p-2 rounded-lg w-full">
                    <p className="p-4">To the right</p>
                    <FaArrowAltCircleRight size={50} />
                </div>
            </div>
            {/* Left column for Room 3 and Room 5 */}
            <div className="flex flex-col justify-center items-center pl-4 pr-2">
                <div className="bg-yellow-700 m-4 p-4 rounded-lg flex items-center justify-evenly w-full">
                    <div className="flex flex-col items-center justify-center pr-20 pl-10">
                        <GiStairs size={100} />
                        <p>Upstairs</p>
                    </div>

                    {room3.party ? (
                        <>
                            Room 3 <br /> {room3.party.childName}’s Party <br />
                            {room3.party.time} - {room3.party.endTime}
                        </>
                    ) : (
                        <>
                            Room 3 <br /> <br /> No Party
                        </>
                    )}
                </div>
                <div className="bg-yellow-700 m-4 p-4 rounded-lg flex items-center justify-evenly w-full">
                    <div className="flex flex-col items-center justify-center pr-20 pl-10">
                        <GiMonkey size={100} />
                        <p>Monkey Door</p>
                    </div>

                    {room5.party ? (
                        <>
                            Room 5 <br /> {room5.party.childName}’s Party <br />
                            {room5.party.time} - {room5.party.endTime}
                        </>
                    ) : (
                        <>
                            Room 5 <br /> <br /> No Party
                        </>
                    )}
                </div>
            </div>

            {/* Right column for Room 1, 2, and 4 */}
            <div className="flex flex-col justify-evenly items-center pl-2 pr-4">
                <div className="bg-green-700 m-4 p-4 rounded-lg flex items-center justify-evenly w-full">
                    <div className="flex flex-col items-center justify-center pr-20">
                        <div className="flex flex-row items-center justify-center">
                            <GiStairs size={100} />
                        </div>

                        <p className="text-xl">Upstairs then left</p>
                    </div>
                    {room1.party ? (
                        <>
                            Room 1 <br /> {room1.party.childName}’s Party <br />
                            {room1.party.time} - {room1.party.endTime}
                        </>
                    ) : (
                        <>
                            Room 1 <br /> <br /> No Party
                        </>
                    )}
                </div>
                <div className="bg-green-700 m-4 p-4 rounded-lg flex items-center justify-evenly w-full">
                    <div className="flex flex-col items-center justify-center pr-20">
                        <GiStairs size={100} />
                        <p className="text-xl">Upstairs then right</p>
                    </div>
                    {room2.party ? (
                        <>
                            Room 2 <br /> {room2.party.childName}’s Party <br />
                            {room2.party.time} - {room2.party.endTime}
                        </>
                    ) : (
                        <>
                            Room 2 <br /> <br /> No Party
                        </>
                    )}
                </div>
                <div className="bg-green-700 m-4 p-4 rounded-lg flex items-center justify-evenly w-full">
                    <div className="flex flex-col items-center justify-center pr-20">
                        <GiTigerHead size={100} />
                        <p>Tiger Door</p>
                    </div>

                    {room4.party ? (
                        <>
                            Room 4 <br /> {room4.party.childName}’s Party <br />
                            {room4.party.time} - {room4.party.endTime}
                        </>
                    ) : (
                        <>
                            Room 4 <br /> <br /> No Party
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
