package io.github.collagrid.starter.api;

import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

public class YourEngine {
    private final TransactionTemplate transactionTemplate;
    private final UserMapper userMapper;

    public YourEngine(
            PlatformTransactionManager transactionManager,
            UserMapper userMapper
    ) {
        this.userMapper = userMapper;
        this.transactionTemplate = new TransactionTemplate(transactionManager);
    }

    public void performOperationWithTransaction() {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try {
                    userMapper.count();
                    // Your transactional code here
                    // For example:
                    // jdbcTemplate.update("INSERT INTO table_name (column) VALUES (?)", value);
                } catch (Exception ex) {
                    status.setRollbackOnly();
                    throw ex;  // Re-throwing exception to ensure rollback
                }
            }
        });
    }
}
