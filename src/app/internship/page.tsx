import { redirect } from "next/navigation";
import { ROUTES } from "../_lib/routes";

export default function Internship() {
  redirect(ROUTES.skill_test);
  return null;
}