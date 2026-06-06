
// const currentCastCache = new Map<string, Promise<CurrentWeather | null>>();
// const dailyCastCache = new Map<string, Promise<DailyWeather | null>>();
// const hourlyCastCache = new Map<string, Promise<HourlyWeather | null>>();

// export const getCurrentWeather = async (
//   token: string,
//   lat: string,
//   lon: string,
// ): Promise<CurrentWeather | null> => {
//   if (currentCastCache.has(lat + "-" + lon)) {
//     return currentCastCache.get(lat + "-" + lon)!;
//   }
//   if (!readyInstance) {
//     readyInstance = axiosInstanceGen(token);
//   }
//   const instance = readyInstance;
//   const promise = instance
//     .get<CurrentWeather>("/current", {
//       params: {
//         lat,
//         lon,
//       },
//     })
//     .then((res) => res.data)
//     .catch((err) => {
//       console.error("Error fetching current weather:", err);
//       return null;
//     });
//   currentCastCache.set(lat + "-" + lon, promise);
//   return promise;
// };

// export const getDailyWeather = async (
//   token: string,
//   lat: string,
//   lon: string,
// ): Promise<DailyWeather | null> => {
//   if (dailyCastCache.has(lat + "-" + lon)) {
//     return dailyCastCache.get(lat + "-" + lon)!;
//   }
//   if (!readyInstance) {
//     readyInstance = axiosInstanceGen(token);
//   }
//   const instance = readyInstance;
//   const promise = instance
//     .get<DailyWeather>("/daily", {
//       params: {
//         lat,
//         lon,
//         days: 7,
//       },
//     })
//     .then((res) => res.data)
//     .catch((err) => {
//       console.error("Error fetching daily weather:", err);
//       return null;
//     });
//   dailyCastCache.set(lat + "-" + lon, promise);
//   return promise;
// };

// export const getHourlyWeather = async (
//   token: string,
//   lat: string,
//   lon: string,
// ): Promise<HourlyWeather | null> => {
//   if (hourlyCastCache.has(lat + "-" + lon)) {
//     return hourlyCastCache.get(lat + "-" + lon)!;
//   }
//   if (!readyInstance) {
//     readyInstance = axiosInstanceGen(token);
//   }
//   const instance = readyInstance;
//   const promise = instance
//     .get<HourlyWeather>("/hourly", {
//       params: {
//         lat,
//         lon,
//       },
//     })
//     .then((res) => res.data)
//     .catch((err) => {
//       console.error("Error fetching hourly weather:", err);
//       return null;
//     });
//   hourlyCastCache.set(lat + "-" + lon, promise);
//   return promise;
// };

// After working the Above I figuered that it doesn't matter for the api to have daily/hourly.. 
// it just returns the same data with all the fields, so I will just have one function to fetch all the data at once,
// and then the components can pick what they need from it.