package com.example.librarydemo.Services;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class InterceptorConfig implements Interceptor {
    private int maxRetries;
    private long delayBetweenRetries;

    public InterceptorConfig(int maxRetries, long delayBetweenRetries) {
        this.maxRetries = maxRetries;
        this.delayBetweenRetries = delayBetweenRetries;
    }

    @Override
    public Response intercept(Interceptor.Chain chain) throws IOException {
        Request request = chain.request();
        IOException exception = null;

        for (int i = 0; i < maxRetries; i++) {
            try {
                Response response = chain.proceed(request);
                return response;
            } catch (IOException e) {
                exception = e;
                try {
                    Thread.sleep(delayBetweenRetries);
                } catch (InterruptedException ignored) {
                }
            }
        }

        throw exception;
    }
}
