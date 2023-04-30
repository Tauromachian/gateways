export default [
  {
    path: "/",
    redirect: { name: "gateway" },
    component: () => import("@/layout/default"),
    children: [
      {
        path: "gateway",
        name: "gateway",
        component: () => import("@/views/Gateway"),
      },
      {
        path: "peripheral",
        name: "peripheral",
        component: () => import("@/views/Peripheral"),
      },
    ],
  },

  { path: "/:catchAll(.*)", component: () => import("@/views/404") },
];
