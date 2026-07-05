import { getAllSwimmers } from "@/src/mongo/swimmer.mongo";
import { getAllTeams } from "@/src/mongo/team.mongo";

export default async function Home() {
  const teams = await getAllTeams();
  const swimmers = await getAllSwimmers();

  return <div>
    <div>
      <h1>Anmeldung zum 24 Stunden Schwimmen 2026</h1>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum soluta fugiat fugit architecto quod fuga, numquam natus enim dicta at nobis, temporibus sint, ex repellendus doloremque laboriosam commodi in quasi!</p>
      </div>
    </div>

    <div>
      <h1>Teams</h1>
      <div>{JSON.stringify(teams)}</div>
    </div>

    <div>
      <h1>Schwimmer</h1>
      <div>{JSON.stringify(swimmers)}</div>
    </div>

    <div className="flex flex-row gap-4 pt-4 justify-center-safe">
      <div className="flex flex-col items-center justify-center py-4 w-32 cursor-pointer rounded-lg bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-24">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
        </svg>
        <div className="text-center">Schwimmer</div>
      </div>
      <div className="flex flex-col items-center justify-center py-4 w-32 cursor-pointer rounded-lg bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-24">
          <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
        </svg>
        <div className="text-center">Team</div>
      </div>
    </div>
  </div>
}
