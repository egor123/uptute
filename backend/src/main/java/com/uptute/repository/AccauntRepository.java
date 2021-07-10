package com.uptute.repository;

import com.uptute.domain.Accaunt;

public interface AccauntRepository {
    Accaunt get(String UUID);
    void add(Accaunt user);
    void update(Accaunt user);
    void remove(Accaunt user);
}
