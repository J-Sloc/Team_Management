import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "../../../generated/prisma";
import AthleteJournalsClient from "./AthleteJournalsClient";

export default async function AthleteJournalPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== UserRole.ATHLETE) {
    redirect("/");
  }

  const athlete = await prisma.athlete.findFirst({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
    },
  });

  if (!athlete) {
    redirect("/login");
  }

  return <AthleteJournalsClient athlete={athlete} />;
}
