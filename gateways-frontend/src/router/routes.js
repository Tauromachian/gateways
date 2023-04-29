export default [
  {
    path: "/",
    redirect: { name: "gateways" },
    component: () => import("@/layouts/default"),
    children: [
      {
        path: "gateways",
        name: "gateways",
        component: () => import("@/views/app/Gateway"),
      },
      {
        path: "peripherals",
        name: "peripherals",
        component: () => import("@/views/app/Peripheral"),
      },
    ],
  },

  { path: "/:catchAll(.*)", component: () => import("@/views/404") },
];
