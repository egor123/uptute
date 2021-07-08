package com.uptute;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

import org.glassfish.jersey.server.ResourceConfig;

public class App {

  private void start() throws Exception {
    ResourceConfig config = new ResourceConfig();
    config.packages("com.uptute");
    ServletContextHandler context = new ServletContextHandler();
    context.addServlet(new ServletHolder(new ServletContainer(config)), "/api/*");
    Server server = new Server(9000);
    server.setHandler(context);
    server.start();
    server.join();
  }

  public static void main(String[] args) throws Exception {
    App app = new App();
    app.start();
  }
}