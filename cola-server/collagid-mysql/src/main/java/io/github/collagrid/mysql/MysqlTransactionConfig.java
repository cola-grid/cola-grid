package io.github.collagrid.mysql;

import io.github.collagid.core.des.EventBus;
import io.github.collagrid.mysql.io.MysqlLoaderCollection;
import io.github.collagrid.mysql.io.MysqlSaverCollection;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@ConditionalOnProperty(name = "cola.database.type", havingValue = "mysql")
@MapperScan("io.github.collagrid.mysql")
public class MysqlTransactionConfig {

    @Bean
    public DataSource mysqlDataSource() {
        System.out.println("Loading Mysql DataSource");
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/apitable");
        dataSource.setUsername("root");
        dataSource.setPassword("apitable@com");
        return dataSource;
    }

    @Bean
    public PlatformTransactionManager mysqlTransactionManager(DataSource mysqlDataSource) {
        return new DataSourceTransactionManager(mysqlDataSource);
    }

    @Bean
    public MysqlColGridTx colaGridTx(PlatformTransactionManager mysqlTransactionManager) {
        return new MysqlColGridTx(mysqlTransactionManager);
    }

    @Bean
    public EventBus eventBus(MysqlLoaderCollection loaderCollection, MysqlSaverCollection saverCollection) {
        System.out.println("init cola event bus");
        return new EventBus(loaderCollection, saverCollection);
    }
}

