package com.example.customer.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class RequestLoggingInterceptor implements HandlerInterceptor {

    private static final String START_TIME_ATTRIBUTE = "requestStartTimeMillis";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute(START_TIME_ATTRIBUTE, System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        Exception ex
    ) {
        Object startAttr = request.getAttribute(START_TIME_ATTRIBUTE);
        long durationMs = 0L;
        if (startAttr instanceof Long start) {
            durationMs = System.currentTimeMillis() - start;
        }

        log.info(
            "method={} path={} status={} durationMs={} remoteIp={}",
            request.getMethod(),
            request.getRequestURI(),
            response.getStatus(),
            durationMs,
            request.getRemoteAddr()
        );
    }
}
