package io.github.collagid.core.api.record.listener;

import io.github.collagid.core.api.record.event.RecordOption;

public interface RecordDeleted {

    void onRecordDeleted(RecordOption option);

}
