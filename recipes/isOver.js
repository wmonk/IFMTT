module.exports = function (amount, transaction) {
    return amount < transaction.data.amount;
};
