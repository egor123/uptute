package com.uptute.backend.lesson.stores;

import java.util.HashMap;
import java.util.Map;

import com.uptute.backend.lesson.domain.StreamWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class ConnectionStoreBase<T, K> {

    private final Map<String, StreamWrapper<T, K>> users = new HashMap<>();

    public void add(String uuid, StreamWrapper<T, K> wrapper) {
        if(users.containsKey(uuid)) return; // TODO: throw error!!!!!!
        users.put(uuid, wrapper);
        wrapper.onDisconnect.subscribe(msg -> users.remove(uuid));
        log.info("user: '" + uuid + "' connected");
    }

    public StreamWrapper<T, K> get(String uuid) {
        if (!users.containsKey(uuid))
            return null; // TODO: throw error!!!!!!
        var usr = users.get(uuid);
        if (usr.isActive())
            return usr; // TODO: throw error!!!!!!
        usr.onDisconnect.invoke("connection is lost");
        return null; // TODO: throw error!!!!!!
    }
}
