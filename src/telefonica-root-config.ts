import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@tdp/visor",
  app: () => System.import("@tdp/visor"),
  activeWhen: '/',
});

// registerApplication({
//   name: "@tdp/home",
//   app: () => System.import("@tdp/home"),
//   activeWhen: (location) => isActive.home(location),
// });

start({ urlRerouteOnly: true });
