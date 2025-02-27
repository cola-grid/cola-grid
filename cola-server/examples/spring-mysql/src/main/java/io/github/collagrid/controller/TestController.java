package io.github.collagrid.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.github.collagid.core.cmd.api.ApiCmdParams;
import io.github.collagid.core.cmd.api.ApiCmdType;
import io.github.collagid.core.des.Engine;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.Resource;

@RequestMapping("/test/dst")
@RestController
public class TestController {

    @Resource
    private Engine engine;

    @GetMapping()
    public ObjectNode testGet(
            @RequestParam String dstId
    ) {
        System.out.println("dstId: " + dstId);
        ApiCmdParams apiCmdParams = new ApiCmdParams();
        apiCmdParams.cmdType = ApiCmdType.LIST_DATASHEETS;
        apiCmdParams.dstId = dstId;
        return engine.apiCmd(apiCmdParams);
    }

    @PostMapping()
    public ObjectNode testCreate(
            @RequestParam String dstId
    ) {
        ApiCmdParams apiCmdParams = new ApiCmdParams();
        apiCmdParams.cmdType = ApiCmdType.ADD_DATASHEET;
        apiCmdParams.dstId = dstId;
        return engine.apiCmd(apiCmdParams);
    }
}
