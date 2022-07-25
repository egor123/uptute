package com.uptute.backend.account.converters;

import javax.persistence.AttributeConverter;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.Message.Builder;
import com.google.protobuf.util.JsonFormat;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MessageConverter<T extends Message> implements AttributeConverter<T, String> {

    @Override
    public String convertToDatabaseColumn(T attribute) {
        try {
            return JsonFormat.printer().print(attribute);
        } catch (InvalidProtocolBufferException e) {
            log.error("JSON writing error", e);
            return null;
        }
    }

    @Override
    @SuppressWarnings({"unchecked"})
    public T convertToEntityAttribute(String dbData) {
        try {
            var clazz = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];//XXX getClass??? probably have to cast
            var builder = (Builder) clazz.getMethod("newBuilder").invoke(null);
            JsonFormat.parser().ignoringUnknownFields().merge(dbData, builder);
            return (T) builder.build();
        } catch (final IOException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
            log.error("JSON reading error", e);
            return null;
        }
    }
}
