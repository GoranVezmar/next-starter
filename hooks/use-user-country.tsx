import { useEffect, useState } from "react";

import Cookies from "js-cookie";

export const useUserCountry = () => {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const userCountryCookie = Cookies.get("user-country");

    if (userCountryCookie) setCountry(userCountryCookie);
  }, []);

  return country;
};
