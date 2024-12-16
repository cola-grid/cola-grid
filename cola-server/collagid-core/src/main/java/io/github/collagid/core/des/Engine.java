package io.github.collagid.core.des;

import io.github.collagid.core.op.ChangesetVO;
import io.github.collagid.core.parser.OpTranslateManager;

import java.util.ArrayList;
import java.util.List;

public class Engine {
    private final EventBus eventBus;
    private final OpTranslateManager opTranslateManager;

    public Engine(EventBus eventBus, OpTranslateManager opTranslateManager) {
        this.eventBus = eventBus;
        this.opTranslateManager = opTranslateManager;
    }

    public void ot(List<ChangesetVO> changesets) {
        List<Event> events = translateOp(changesets);
        if (events == null || events.isEmpty()) {
            return;
        }
        for (Event event : events) {
            eventBus.publish(event);
        }
    }

    /**
     * 将前端发来的 OP 转成事件
     * */
    public List<Event> translateOp(List<ChangesetVO> changesets) {
        List<Event> events = new ArrayList<>();
        for (ChangesetVO changeset : changesets) {
            Event event = opTranslateManager.doTrans(changeset);
            events.add(event);
        }
        return events;
    }
}
