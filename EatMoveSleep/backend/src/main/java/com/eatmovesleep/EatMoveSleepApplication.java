package com.eatmovesleep;
import org.h2.server.web.JakartaWebServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@EntityScan
@Configuration
@SpringBootApplication
@RestController
@ComponentScan
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.eatmovesleep.repository")
public class EatMoveSleepApplication {

	public static void main(String[] args) {

		SpringApplication.run(EatMoveSleepApplication.class, args);
	}

	@Bean
	public ServletRegistrationBean<JakartaWebServlet> h2ConsoleServletRegistration() {
		ServletRegistrationBean<JakartaWebServlet> registration =
				new ServletRegistrationBean<>(new JakartaWebServlet());
		registration.addUrlMappings("/a/*");
		return registration;
	}

	@GetMapping("/home")
	public String home(){
		return "EatMoveSleep";
	}

}

