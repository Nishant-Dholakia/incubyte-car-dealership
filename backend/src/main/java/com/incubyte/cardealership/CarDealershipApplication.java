package com.incubyte.cardealership;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class CarDealershipApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarDealershipApplication.class, args);
    }

}
