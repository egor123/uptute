package com.uptute;

import java.util.EnumSet;

import javax.servlet.DispatcherType;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceFilter;
import com.uptute.config.AppModule;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

import org.glassfish.jersey.server.ResourceConfig;

public class App {
  public final String HOST = "127.0.0.1";
  public final int PORT = 9000;
  public final int TIMEOUT = 5000;
  public final String PATH = "/api/*";

  private void start() throws Exception {
    Server server = new Server();
    ServerConnector connector = new ServerConnector(server);
    connector.setHost(HOST);
    connector.setPort(PORT);
    connector.setIdleTimeout(TIMEOUT);
    server.addConnector(connector);
    ResourceConfig config = new ResourceConfig();
    config.packages("com.uptute");
    ServletContextHandler context = new ServletContextHandler();
    context.addFilter(GuiceFilter.class, "/*", EnumSet.allOf(DispatcherType.class));
    context.addServlet(new ServletHolder(new ServletContainer(config)), PATH);
    server.setHandler(context);
    server.start();
    server.join();
  }

  public static void main(String[] args) throws Exception {
    final Injector injector = Guice.createInjector(new AppModule());
    injector.getInstance(App.class).start();
  }
}