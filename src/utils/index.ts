import { GeoJSONData } from 'types/api';

export const prettyPrint = (value: number) => {
  if (value === undefined) {
    return 'N/A';
  }

  return value.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  });
};
/** https://www.whatismybrowser.com/guides/the-latest-user-agent/
 * Chrome:
 *  { Chrome: Windows, Mac OS, Linux, Android },
 *  { CriOS: iOS }
 * Firefox:
 *  { Firefox: Windows, Mac OS, Linux, Android },
 *  { FxiOS: iOS}
 * Safari:
 *  { Safari: Mac OS, iOS }
 * IE:
 *  { MSIE: IE 8, IE9, IE10 }
 *  { Trident: IE 11 }
 */
export const isValidUserAgent = () => {
  const USER_AGENT = navigator.userAgent;

  return USER_AGENT.indexOf("Chrome") !== -1
      || USER_AGENT.indexOf("CriOS") !== -1
      || USER_AGENT.indexOf("Firefox") !== -1
      || USER_AGENT.indexOf("FxiOS") !== -1
      || USER_AGENT.indexOf("Safari") !== -1
      || USER_AGENT.indexOf("MSIE") !== -1
      || USER_AGENT.indexOf("Trident") !== -1;
}

// For the ticker card totals...
export const calculateTotals = (
  data: GeoJSONData,
  initial: {
    total_confirmed: number;
    total_deaths: number;
    total_recovered: number;
  }
) => {
  return data.reduce((sums, thisOne: any) => {
    const { properties } = thisOne;
    const { total_confirmed, total_deaths, total_recovered } = properties;

    return {
      total_confirmed: sums.total_confirmed + (total_confirmed || 0),
      total_deaths: sums.total_deaths + (total_deaths || 0),
      total_recovered: sums.total_recovered + (total_recovered || 0),
    };
  }, initial);
};
