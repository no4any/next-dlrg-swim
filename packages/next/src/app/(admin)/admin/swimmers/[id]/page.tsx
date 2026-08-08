import { ButtonSuccess } from "@/src/components/Button.component";
import { CommentList } from "@/src/components/CommentList.component";
import { CommentsForm } from "@/src/components/forms/comments/CommentsForm.component";
import { SwimmerDetails } from "@/src/components/SwimmerDetails";
import { generateHash } from "@/src/lib-server-only";
import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function SwimmerPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;

    const swimmer = await getSwimmer(id);
    if(!swimmer) notFound();

    return <div>
        <h1>Schwimmer: {swimmer.firstName} {swimmer.lastName}</h1>
        <div className="py-4">
            {swimmer.status === "ANNOUNCED" ? <Link className="mr-2" prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString()}/register`}>
                <ButtonSuccess>Anmelden</ButtonSuccess>
            </Link> : <></>}
            {swimmer.status === "REGISTERED" ? <Link className="mr-2" prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString()}/updateRegistration`}>
                <ButtonSuccess>Registrierung ändern</ButtonSuccess>
            </Link> : <></>}
            <Link className="" prefetch={false} href={`/anmelden/schwimmer/${swimmer._id?.toString()}/${await generateHash(swimmer._id?.toString() || "")}`}>
                <ButtonSuccess>Inspizieren</ButtonSuccess>
            </Link>
        </div>
        <SwimmerDetails swimmer={swimmer} />
        <div>
            <h2 className="my-4">Kommentare</h2>
            <Suspense fallback={<div>Laden ...</div>}>
                <CommentsForm type="SWIMMER" id={swimmer._id.toString()}/>
            </Suspense>
        </div>
        <div>
            <CommentList comments={swimmer.comments ?? undefined} />
        </div>
    </div>
}