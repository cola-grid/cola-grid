package io.github.collagrid.config;


import io.github.collagid.core.des.Engine;
import io.github.collagid.core.des.EventBus;
import io.github.collagid.core.tx.ColaGridTx;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

@Configuration
public class ColaEngineConfig {

    @Bean
    @DependsOn({"eventBus", "colaGridTx"})
    public Engine mysqlEngine(EventBus eventBus, ColaGridTx colaGridTx) {
        System.out.println("load mysql engine");
        return new Engine(eventBus, colaGridTx);
    }
}
