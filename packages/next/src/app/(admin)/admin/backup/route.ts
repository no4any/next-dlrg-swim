import { getLogin } from "@/src/lib";
import { backupSwimmer } from "@/src/mongo/swimmer.mongo";
import { backupTeam } from "@/src/mongo/team.mongo";
import { backupUser } from "@/src/mongo/user.mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const username = await getLogin();

    if(!username) return NextResponse.json({});

    return NextResponse.json({
        swimmers: await backupSwimmer(),
        teams: await backupTeam(),
        users: await backupUser()
    })
}