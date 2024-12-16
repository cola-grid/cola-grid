package io.github.collagid.core.cmd;

import io.github.collagid.core.des.Event;
import io.github.collagid.core.des.EventListener;
import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;

public abstract class AbsCmd<T extends Event> implements EventListener<Event> {

    protected final LoaderCollection loaders;
    protected final SaverCollection savers;

    public AbsCmd(LoaderCollection loaders, SaverCollection savers) {
        this.loaders = loaders;
        this.savers = savers;
    }
}
