const { TransferTransaction, Hbar } = require('@hashgraph/sdk');
const { hederaClient } = require('../config/config');

const createTransaction = async (amount) => {
  const transaction = await new TransferTransaction()
    .addHbarTransfer(hederaClient.operatorAccountId, Hbar.fromTinybars(-amount))
    .addHbarTransfer("0.0.3", Hbar.fromTinybars(amount))
    .execute(hederaClient);

  const receipt = await transaction.getReceipt(hederaClient);
  return receipt.transactionId.toString();
};

module.exports = { createTransaction };
