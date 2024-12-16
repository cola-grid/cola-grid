package io.github.collagid.core.api.dtos;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RecordDTOTest {

    @Test
    public void testSetId() {
        RecordDTO recordDTO = new RecordDTO();
        recordDTO.setId("123");
        assertEquals("123", recordDTO.getId());
        System.out.println(recordDTO.toPrettyString());
        try {
            RecordDTO record = this.get("{\n" +
                    "  \"id\" : \"123\"\n" +
                    "}");
            assertEquals(record.getId(), "123");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private RecordDTO get(String text) throws JsonProcessingException {
        ObjectNode jsonNodes = new ObjectMapper().readValue(text, ObjectNode.class);
        RecordDTO recordDTO = new RecordDTO();
        recordDTO.setAll(jsonNodes);
        return recordDTO;
    }
}