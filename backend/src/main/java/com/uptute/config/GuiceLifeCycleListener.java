package com.uptute.config;

import javax.servlet.annotation.WebListener;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Singleton;

import org.eclipse.jetty.util.component.LifeCycle;
import org.eclipse.jetty.util.component.AbstractLifeCycle.AbstractLifeCycleListener;

@WebListener
public class GuiceLifeCycleListener extends AbstractLifeCycleListener {
    @Override
    public void lifeCycleStarted(LifeCycle event) {
        System.out.println("Bootstrapping Guice injector ...");
        Guice.createInjector(new AppModule());
    }
}