// import { Context } from "hono";

// import { kindeClient, sessionManager } from "@/lib/kinde";

// import { AuthEnv } from "../middlewares/auth.middleware";

// export const login = async (c: Context) => {
//   const loginUrl = await kindeClient.login(sessionManager(c));
//   return c.redirect(loginUrl.toString());
// };

// export const register = async (c: Context) => {
//   // TODO check if email already existed or something, also do for login
//   const registerUrl = await kindeClient.register(sessionManager(c));
//   return c.redirect(registerUrl.toString());
// };

// export const callback = async (c: Context) => {
//   const url = new URL(c.req.url);
//   await kindeClient.handleRedirectToApp(sessionManager(c), url);
//   return c.redirect("/");
// };

// export const logout = async (c: Context) => {
//   const logoutUrl = await kindeClient.logout(sessionManager(c));
//   return c.redirect(logoutUrl.toString());
// };

// export const me = async (c: Context<AuthEnv>) => {
//   const user = c.var.user;
//   return c.json({ user });
// };
