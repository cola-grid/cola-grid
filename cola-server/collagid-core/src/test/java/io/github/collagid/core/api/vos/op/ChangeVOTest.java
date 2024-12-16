package io.github.collagid.core.api.vos.op;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ChangeVOTest {

    @Test
    public void testSerialization() throws Exception {
        String s = "{\"type\":\"CLIENT_ROOM_CHANGE\",\"roomId\":\"dstwyPalsPXW7jBqHp\",\"changesets\":[{\"messageId\":\"MN1iXJGzRyJiOa4dzOyQ\",\"baseRevision\":0,\"resourceId\":\"dstwyPalsPXW7jBqHp\",\"resourceType\":0,\"operations\":[{\"cmd\":\"SetRecords\",\"actions\":[{\"n\":\"OI\",\"p\":[\"recordMap\",\"recElVSnB0XeN\",\"data\",\"fldr6yGPipHaR\"],\"oi\":[{\"type\":1,\"text\":\"gh\"}]}]}]}]}";
        ChangeVO changeVO = new ObjectMapper().readValue(s, ChangeVO.class);
        assertNotNull(changeVO);
        assertEquals(changeVO.getType(), "CLIENT_ROOM_CHANGE", "type should be CLIENT_ROOM_CHANGE");
    }
}