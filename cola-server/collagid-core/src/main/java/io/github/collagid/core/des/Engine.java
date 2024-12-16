package io.github.collagid.core.des;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.github.collagid.core.cmd.api.ApiCmdManager;
import io.github.collagid.core.cmd.api.ApiCmdParams;
import io.github.collagid.core.op.ChangesetVO;
import io.github.collagid.core.parser.OpTranslateManager;
import io.github.collagid.core.tx.ColaGridTx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class Engine {
    private final Logger LOGGER;
    private final EventBus eventBus;
    private final OpTranslateManager opTranslateManager;
    private final ColaGridTx tx;

    public Engine(EventBus eventBus, ColaGridTx tx) {
        LOGGER = LoggerFactory.getLogger(getClass());
        LOGGER.info("init cola grid engine");
        this.eventBus = eventBus;
        this.opTranslateManager = new OpTranslateManager();
        this.tx = tx;
    }

    public void ot(List<ChangesetVO> changesets) {
        List<Event> events = translateOp(changesets);
        if (events == null || events.isEmpty()) {
            return;
        }
        long start = System.currentTimeMillis();
        try {
            ColaContext context = this.loadContext();
            tx.startTx();
            for (Event event : events) {
                eventBus.publish(event, context);
            }
            tx.commitTx();
        }catch (Exception e) {
            tx.rollbackTx();
            throw e;
        }finally {
            LOGGER.info("handle op cost {} ms", System.currentTimeMillis() - start);
        }
    }

    private ColaContext loadContext() {
        return new ColaContext();
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

    public ObjectNode apiCmd(ApiCmdParams apiCmdParams) {
        return ApiCmdManager.execute(apiCmdParams, eventBus.getLoaders(), eventBus.getSavers());
    }

}
