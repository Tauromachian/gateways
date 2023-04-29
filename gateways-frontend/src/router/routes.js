export default [
  {
    path: "/",
    redirect: { name: "gateways" },
    component: () => import("@/layout/default"),
    children: [
      {
        path: "gateways",
        name: "gateways",
        component: () => import("@/views/Gateway"),
      },
      {
        path: "peripherals",
        name: "peripherals",
        component: () => import("@/views/Peripheral"),
      },
    ],
  },

  { path: "/:catchAll(.*)", component: () => import("@/views/404") },
];
