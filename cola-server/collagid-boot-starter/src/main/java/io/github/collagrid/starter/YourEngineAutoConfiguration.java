package io.github.collagrid.starter;

import io.github.collagrid.starter.api.YourEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class YourEngineAutoConfiguration {

    @Autowired
    private DataSource dataSource;

    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean
    public YourEngine yourEngine(PlatformTransactionManager transactionManager) {
        return new YourEngine(transactionManager);
    }
}
