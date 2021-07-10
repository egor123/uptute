package com.uptute.config;

import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import com.google.inject.AbstractModule;

import org.reflections.Reflections;

public final class ScanModule extends AbstractModule {
    private final String packageName;
    private final Set<Class<? extends Annotation>> bindingAnnotations;

    @SafeVarargs
    public ScanModule(String packageName, final Class<? extends Annotation>... bindingAnnotations) {
        this.packageName = packageName;
        this.bindingAnnotations = new HashSet<>(Arrays.asList(bindingAnnotations));
    }

    @Override
    public void configure() {
        Reflections packageReflections = new Reflections(packageName);
        bindingAnnotations.stream()
            .map(packageReflections::getTypesAnnotatedWith)
            .flatMap(Set::stream)
            .forEach(this::bind);
    }
}
