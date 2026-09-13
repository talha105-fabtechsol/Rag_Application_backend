import express, { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import ragRoute from "./rag.route";
import imageRoute from "./image.route";
import adminRoute from "./admin.route";
import blogRoute from "./blog.route";

const router = express.Router();
interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/rag",
    route: ragRoute,
  },
  {
    path: "/image",
    route: imageRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/blogs",
    route: blogRoute,
  },
];

// Globally Routes
defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
