package com.uptute.backend.lesson.services;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uptute.backend.lesson.domain.StreamWrapper;

public abstract class ConnectionStoreBase<T, K> {

    Logger logger = LoggerFactory.getLogger(ConnectionStoreBase.class);

    private Map<String, StreamWrapper<T, K>> users = new HashMap<>();

    public void add(String uuid, StreamWrapper<T, K> wrapper) {
        if(users.containsKey(uuid)) return; // TODO: throw error!!!!!!
        users.put(uuid, wrapper);
        logger.info("user: '" + uuid + "' connected");
    }

    public StreamWrapper<T, K> get(String uuid) {
        if (!users.containsKey(uuid))
            return null; // TODO: throw error!!!!!!
        var usr = users.get(uuid);
        if (usr.isActive())
            return usr; // TODO: throw error!!!!!!
        disconnect(uuid, usr, "conection is lost");
        return null; // TODO: throw error!!!!!!
    }

    public void remove(String uuid) {
        disconnect(uuid, get(uuid), "disconnecting user");
    }

    private void disconnect(String uuid, StreamWrapper<T, K> usr, String msg) {
        if (usr == null)
            return; // TODO: throw error!!!!!!
        usr.onDisconnect.invoke(msg);
        users.remove(uuid);
        logger.info("user: '" + uuid + "' disconnected");
    }
}
