package io.github.collagid.core.cmd;

import io.github.collagid.core.des.Event;
import io.github.collagid.core.event.TestEvent;
import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;

public class TestCmd extends AbsCmd<TestEvent> {

    public TestCmd(LoaderCollection loaders, SaverCollection savers) {
        super(loaders, savers);
    }

    @Override
    public void onEvent(Event event) {
        System.out.println("哈哈哈哈哈");
    }
}
