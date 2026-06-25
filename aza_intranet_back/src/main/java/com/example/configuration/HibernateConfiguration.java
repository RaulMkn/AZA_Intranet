package com.example.configuration;

import com.example.entity.AppointmentEntity;
import com.example.entity.DepartmentEntity;
import com.example.entity.DentistEntity;
import com.example.entity.EventEntity;
import com.example.entity.InterventionEntity;
import com.example.entity.PatientEntity;
import com.example.entity.PaymentEntity;
import com.example.entity.PictureEntity;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class HibernateConfiguration {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null || sessionFactory.isClosed()) {
            buildSessionFactory();
        }
        return sessionFactory;
    }

    private static void buildSessionFactory() {
        Configuration configuration = new Configuration();
        configuration.setProperty("hibernate.connection.url", getEnv("DB_URL", "jdbc:postgresql://localhost:5432/aza_intranet"));
        configuration.setProperty("hibernate.connection.username", getEnv("DB_USERNAME", "aza"));
        configuration.setProperty("hibernate.connection.password", getEnv("DB_PASSWORD", "aza"));
        configuration.setProperty("hibernate.connection.driver_class", "org.postgresql.Driver");
        configuration.setProperty("hibernate.default_schema", "public");
        configuration.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        configuration.setProperty("hibernate.c3p0.min_size", "5");
        configuration.setProperty("hibernate.c3p0.max_size", "20");
        configuration.setProperty("hibernate.c3p0.timeout", "1800");
        configuration.setProperty("hibernate.c3p0.max_statements", "50");
        configuration.setProperty("connection.provider_class", "org.hibernate.c3p0.internal.C3P0ConnectionProvider");
        configuration.setProperty("show_sql", "true");
        configuration.setProperty("format_sql", "true");
        configuration.setProperty("hibernate.use_sql_comments", "true");
        configuration.addAnnotatedClass(PaymentEntity.class);
        configuration.addAnnotatedClass(AppointmentEntity.class);
        configuration.addAnnotatedClass(DepartmentEntity.class);
        configuration.addAnnotatedClass(EventEntity.class);
        configuration.addAnnotatedClass(DentistEntity.class);
        configuration.addAnnotatedClass(PatientEntity.class);
        configuration.addAnnotatedClass(InterventionEntity.class);
        configuration.addAnnotatedClass(PictureEntity.class);
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                .applySettings(configuration.getProperties())
                .build();
        sessionFactory = configuration.buildSessionFactory(serviceRegistry);
    }

    private static String getEnv(String name, String defaultValue) {
        String value = System.getenv(name);
        return value == null || value.isBlank() ? defaultValue : value;
    }
}
