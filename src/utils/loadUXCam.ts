export const loadUxCam = (
  appKey: string,
  opts: Record<string, unknown> = {}
) => {
  if ((window as any).uxc) return;

  (window as any).uxc = {
    __t: [],
    __ak: appKey,
    __o: opts,
    event: function (n: string, p: any) {
      this.__t.push(["event", n, p]);
    },
    setUserIdentity: function (i: string) {
      this.__t.push(["setUserIdentity", i]);
    },
    setUserProperty: function (k: string, v: any) {
      this.__t.push(["setUserProperty", k, v]);
    },
    setUserProperties: function (p: Record<string, any>) {
      this.__t.push(["setUserProperties", p]);
    },
  };

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://websdk-recording.uxcam.com/index.js"; // use HTTPS!
  script.async = true;
  script.defer = true;
  script.id = "uxcam-web-sdk";
  script.crossOrigin = "anonymous";

  document.head.appendChild(script);
};
