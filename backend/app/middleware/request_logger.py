import time

from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

from app.core.logger import logger


class RequestLoggingMiddleware(BaseHTTPMiddleware):

    async def dispatch(
        self,
        request: Request,
        call_next,
    ):

        start_time = time.time()

        response = await call_next(request)

        process_time = round(
            time.time() - start_time,
            4,
        )

        client_ip = (
            request.client.host
            if request.client
            else "Unknown"
        )

        logger.info(
            f"{request.method} {request.url.path} | "
            f"Status={response.status_code} | "
            f"Time={process_time:.4f}s | "
            f"IP={client_ip}"
        )

        return response