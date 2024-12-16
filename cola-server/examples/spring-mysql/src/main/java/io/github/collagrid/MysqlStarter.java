package io.github.collagrid;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MysqlStarter {
    public static void main(String[] args) {
        SpringApplication.run(MysqlStarter.class, args);
    }
}