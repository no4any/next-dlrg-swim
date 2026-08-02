import { AllLapsWidget } from "@/src/components/dashboard/AllLapsWidget";
import { BreakfastWidget } from "@/src/components/dashboard/BreakfastWidget.component";
import { RegistrationsWidget } from "@/src/components/dashboard/RegistrationsWidget.component";

import { getAllSwimmers } from "@/src/mongo/swimmer.mongo";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const swimmers = await getAllSwimmers()

  return <div>
    <h1>Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RegistrationsWidget swimmers={swimmers} />
      <AllLapsWidget />
      <BreakfastWidget swimmers={swimmers} />
    </div>
  </div>
}
