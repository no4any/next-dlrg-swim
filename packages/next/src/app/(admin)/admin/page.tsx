import { AllLapsWidget } from "@/src/components/dashboard/AllLapsWidget";
import { BreakfastWidget } from "@/src/components/dashboard/BreakfastWidget.component";
import { RegistrationsWidget } from "@/src/components/dashboard/RegistrationsWidget.component";
import { getLogin } from "@/src/lib";
import { Suspense } from "react";

export default async function Home() {
  return <div>
    <h1>Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RegistrationsWidget />
      <AllLapsWidget />
      <BreakfastWidget />
    </div>
  </div>
}
