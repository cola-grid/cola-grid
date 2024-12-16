package io.github.collagid.core.tx;

public class EmptyColaGridTx implements ColaGridTx {
    @Override
    public boolean startTx() {
        return true;
    }

    @Override
    public boolean commitTx() {
        return true;
    }

    @Override
    public void rollbackTx() {
    }
}
