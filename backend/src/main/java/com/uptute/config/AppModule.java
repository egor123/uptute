package com.uptute.config;

import com.google.inject.AbstractModule;
import com.google.inject.Scopes;
// import com.google.inject.Singleton;
import com.uptute.services.TutorService;
import com.uptute.services.TutorServiceImpl;

public class AppModule extends AbstractModule {
    @Override
    public void configure(){
        bind(TutorService.class).to(TutorServiceImpl.class);
        // install(new ScanModule("com.uptute", Singleton.class));
    }
}
