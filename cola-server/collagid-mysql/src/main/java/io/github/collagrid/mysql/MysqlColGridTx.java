package io.github.collagrid.mysql;

import io.github.collagid.core.tx.ColaGridTx;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class MysqlColGridTx implements ColaGridTx {
    private final PlatformTransactionManager transactionManager;

    private final ThreadLocal<TransactionStatus> transactionStatus = new ThreadLocal<>();

    public MysqlColGridTx(PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    @Override
    public boolean startTx() {
        transactionStatus.set(transactionManager.getTransaction(new DefaultTransactionDefinition()));
        return true;
    }

    @Override
    public boolean commitTx() {
        TransactionStatus status = transactionStatus.get();
        if (status != null) {
            transactionManager.commit(status);
            transactionStatus.remove(); // 清理 ThreadLocal，防止内存泄漏
        }
        return true;
    }

    @Override
    public void rollbackTx() {
        TransactionStatus status = transactionStatus.get();
        if (status != null) {
            transactionManager.rollback(status);
            transactionStatus.remove();
        }
    }
}
