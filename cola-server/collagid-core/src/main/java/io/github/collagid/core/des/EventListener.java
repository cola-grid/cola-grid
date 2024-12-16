package io.github.collagid.core.des;

public interface EventListener<T> {
    void onEvent(T event);
}
