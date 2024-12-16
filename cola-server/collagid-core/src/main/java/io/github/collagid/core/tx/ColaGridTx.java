package io.github.collagid.core.tx;


public interface ColaGridTx {

    boolean startTx();

    boolean commitTx();

    void rollbackTx();
}
