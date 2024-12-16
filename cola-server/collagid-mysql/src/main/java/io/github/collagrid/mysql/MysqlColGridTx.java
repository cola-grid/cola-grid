package io.github.collagrid.mysql;

import io.github.collagid.core.tx.ColaGridTx;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class MysqlColGridTx implements ColaGridTx {
    private final PlatformTransactionManager transactionManager;
    private TransactionStatus transactionStatus;

    public MysqlColGridTx(PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    @Override
    public boolean startTx() {
        transactionStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
        return true;
    }

    @Override
    public boolean commitTx() {
        if (transactionStatus != null) {
            transactionManager.commit(transactionStatus);
        }
        return true;
    }

    @Override
    public void rollbackTx() {
        if (transactionStatus != null) {
            transactionManager.rollback(transactionStatus);
        }
    }
}
