package com.uptute.backend.account.converters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.AttributeConverter;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class ObjectConverter<T extends Object> implements AttributeConverter<T, String> {

    public static final Logger logger = LoggerFactory.getLogger(ObjectConverter.class);
    public final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(T info) {
        try {
            return objectMapper.writeValueAsString(info);
        } catch (final JsonProcessingException e) {
            logger.error("JSON writing error", e);
            return null;
        }
    }

    @Override
    public T convertToEntityAttribute(String JSON) {
        JavaType type = objectMapper
                .constructType(((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]);
        try {
            return objectMapper.readValue(JSON, type);
        } catch (final IOException e) {
            logger.error("JSON reading error", e);
            return null;
        }
    }
}