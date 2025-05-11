import ky from "ky";
import { Platform } from "react-native";

const baseUrls = {
  android: "http://10.0.2.2:3030",
  ios: "http://localhost:3030",
};

export const api = ky.create({
  prefixUrl: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        console.log("request ====> ", request);
      },
    ],
    // 응답 후에 실행되는 훅
    afterResponse: [
      async (request, options, response) => {
        console.log("response ====> ", response);
        //   if (response.status === 401) {
        //     localStorage.removeItem('token');
        //     window.location.href = '/login';
        //   }

        return response;
      },
    ],
  },
});
