import { Router, type IRouter } from "express";
import healthRouter from "./health";
import blogPostsRouter from "./blog-posts";
import pageItemOverridesRouter from "./page-item-overrides";
import themeSettingsRouter from "./theme-settings";
import adminAuthRouter from "./admin-auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogPostsRouter);
router.use(pageItemOverridesRouter);
router.use(themeSettingsRouter);
router.use(adminAuthRouter);

export default router;
