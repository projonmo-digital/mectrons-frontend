import type { IUser } from "~/types/auth";

export const initTawkTo = (user: IUser, hash: string) => {
  //@ts-ignore
  window.Tawk_API = window.Tawk_API || {};
  //@ts-ignore
  window.Tawk_LoadStart = new Date();
  //@ts-ignore
//   window.Tawk_API.autoStart = false;
  //@ts-ignore
  window.Tawk_API.visitor = {
    name: user.name,
    email: user.email,
    hash: hash,
  };

  //@ts-ignore
  window.Tawk_API.onStatusChange = function (status: any) {
    if (status === "online") {
      //@ts-ignore
      window.Tawk_API.hideWidget();
    }
  };

  //@ts-ignore
  window.Tawk_API.onChatMessageAgent = function (message) {
    //@ts-ignore
    window.Tawk_API.maximize();
  };
  //@ts-ignore
  window.Tawk_API.onChatMessageVisitor = function (message) {
    //@ts-ignore
    window.Tawk_API.maximize();
  };
  //@ts-ignore
  window.Tawk_API.onChatMessageSystem = function (message) {
    //@ts-ignore
    window.Tawk_API.maximize();
  };

  // //@ts-ignore
  // window.Tawk_API.onBeforeLoad = function () {
  //   console.log("onBeforeLoad");
  // };

  // //@ts-ignore
  // window.Tawk_API.onLoad = function () {
  //   //@ts-ignore
  //   console.log('onLoad');
  // };

  (function () {
    let s1: HTMLScriptElement = document.createElement("script");
    let s0: HTMLScriptElement = document.getElementsByTagName("script")[0];
    s1.async = false;
    s1.src = `https://embed.tawk.to/66c1d0de0cca4f8a7a7748ab/1i5ihfq4c`;
    s1.src = `https://embed.tawk.to/${useRuntimeConfig().public.twakToPropertyId}/${useRuntimeConfig().public.twakToWidgetId}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode?.insertBefore(s1, s0);
  })();
};

export const getHashValue = () => {
  const token = useCookie("token");
  let url = `${useRuntimeConfig().public.baseUrl}/chat_hash`;
  return $fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
};
