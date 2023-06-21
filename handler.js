import { sendProxyError, sendProxySuccess } from "./helpers/response";
import { healthHandler } from "./api/health.js";

const RESOURCE_MAP = {
  "/": { GET: healthHandler },
};

export async function handler(event) {
  try {
    console.log("REQUEST RECEIVED", event);
    const method = event.requestContext.http.method;
    const path = event.requestContext.http.path;
    if (method && path) {
      console.log("HTTP EVENT", method, path);
      const resource = RESOURCE_MAP[path];
      const resourceMethod = resource && resource[method];

      console.log("Resource method", resourceMethod)

      if (!resourceMethod) {
        throw new Error("[404] Route Not Found");
      }

      const response = await resourceMethod(event);
      return sendProxySuccess(response);
    }
  } catch (error) {
    return sendProxyError(error);
  }
}
