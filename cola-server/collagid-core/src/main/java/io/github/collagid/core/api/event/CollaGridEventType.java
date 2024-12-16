package io.github.collagid.core.api.event;

public enum CollaGridEventType {
    SNAPSHOT_UPDATE(false),
    CHUNK_CREATE(false),
    VIEW_CREATED(false),
    FIELD_CREATED(false),
    CREATE_RECORD(false),
    CREATE_RECORD_ASYNC(true),
    UPDATE_RECORD(false),
    DELETE_RECORD(false),
    QUERY_RECORD(false),
    QUERY_RECORD_ASYNC(true),
    DATA_CREATE(true),
    DATA_UPDATE(true),
    SNAPSHOT_CREATE(false),;

    private final boolean async;

    CollaGridEventType(boolean async) {
        this.async = async;
    }

    public boolean isAsync() {
        return async;
    }
}
