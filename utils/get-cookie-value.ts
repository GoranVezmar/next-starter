export const getCookieValue = ({ cookieHeader, name }: { cookieHeader?: string | null; name: string }): string | undefined => {
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const target = cookies.find((c) => c.startsWith(`${name}=`));

  return target?.split("=")[1];
};
