package io.github.collagid.core.api.utils;

import io.github.collagid.core.api.event.CollaGridEvent;

public interface Asyncable<T extends CollaGridEvent> {
    
    T async();
}