package com.example.librarydemo.Services;

import android.content.Context;

import com.example.librarydemo.R;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.CertificateFactory;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;

import java.security.cert.Certificate;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {
    private static final String url = "https://10.0.2.2:7082/";
    private Context context;
    private static Retrofit retrofit = null;
    public RetrofitClient(Context context) {
        this.context = context;
    }
    Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

    private static TrustManager[] trustCert(Context context) {
        try {
            // Load the certificate from the raw resource
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            InputStream caInput = context.getResources().openRawResource(R.raw.certificate);
            Certificate ca;
            try {
                ca = cf.generateCertificate(caInput);
            } finally {
                caInput.close();
            }

            // Create a KeyStore containing our trusted certificate
            String keyStoreType = KeyStore.getDefaultType();
            KeyStore keyStore = KeyStore.getInstance(keyStoreType);
            keyStore.load(null, null);
            keyStore.setCertificateEntry("ca", ca);

            // Create a TrustManager that trusts the KeyStore
            String tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
            tmf.init(keyStore);

            return tmf.getTrustManagers();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static OkHttpClient getOkHttpClient(Context context) {
        try {
            // Create an SSLContext that uses our TrustManager
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustCert(context), null);

            // Create an OkHttpClient that uses the custom TrustManager
            OkHttpClient.Builder builder = new OkHttpClient.Builder();
            builder.sslSocketFactory(sslContext.getSocketFactory());
            builder.hostnameVerifier((hostname, session) -> true);

            return builder.build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static ApiService getApiService(Context context) {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(url)
                    .client(getOkHttpClient(context))
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ApiService.class);
    }
}

