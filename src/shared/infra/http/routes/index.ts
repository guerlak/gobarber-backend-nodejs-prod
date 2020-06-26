import { Router } from "express";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import checkAuthentication from "@modules/users/infra/http/middlewares/checkAuthentication";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import providerRouter from "@modules/appointments/infra/http/routes/providers.routes";

const routes = Router();

routes.use("/session", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);

routes.use("/appointments", checkAuthentication, appointmentsRouter);
routes.use("/profile", checkAuthentication, profileRouter);
routes.use("/providers", checkAuthentication, providerRouter);

export default routes;
