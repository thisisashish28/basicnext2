import NextAuth from "next-auth";
import { options } from "./options";

const handler = async (req, context) => {
  return NextAuth(req, context, options);
};

export { handler as GET, handler as POST };
