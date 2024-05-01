import { isAuthenticated } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (await isAuthenticated(request)) {
    return redirect("/library");
  } else {
    return redirect("/auth");
  }
}
