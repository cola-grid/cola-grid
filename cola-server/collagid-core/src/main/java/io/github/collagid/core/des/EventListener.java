package io.github.collagid.core.des;

import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;

public interface EventListener<T> {
    void onEvent(T event);
}
