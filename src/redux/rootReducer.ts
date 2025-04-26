import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/authSlice";
import { ClientReducer } from "./client/clientSllice";
import { JobReducer } from "./jobs/jobSlice";
import { ServiceReducer } from "./services/serviceSlice";
import { ReviewReducer } from "./reviews/reviewSlice";
import { MessageReducer } from "./messages/messageSlice";
import { WorkerReducer } from "./worker/workerSlice";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  client: ClientReducer,
  worker: WorkerReducer,
  job: JobReducer,
  review:ReviewReducer,
  service: ServiceReducer,
  message: MessageReducer
});
