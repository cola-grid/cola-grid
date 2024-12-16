package io.github.collagid.core.api.dtos;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.io.Serializable;

@JsonDeserialize(using = RecordDTO.RecordDTODeserializer.class)
public class RecordDTO extends ObjectNode implements Serializable {
    public RecordDTO() {
        super(JsonNodeFactory.instance);
    }

    public void setId(String id) {
        this.put("id", id);
    }

    public String getId() {
        return this.path("id").asText();
    }

    static class RecordDTODeserializer extends JsonDeserializer<RecordDTO> {

        @Override
        public RecordDTO deserialize(JsonParser p, DeserializationContext ctxt)
                throws IOException, JsonProcessingException {
            System.out.println("xxx");
            ObjectMapper mapper = (ObjectMapper) p.getCodec();
            JsonNode node = mapper.readTree(p);
            RecordDTO recordDTO = new RecordDTO();
            if (node.isObject()) {
                ObjectNode objectNode = (ObjectNode) node;
                recordDTO.setAll(objectNode);
            }
            return recordDTO;
        }
    }
}
