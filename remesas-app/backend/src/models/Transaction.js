import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'USD'
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('send', 'receive', 'deposit', 'withdrawal'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'cancelled'),
        defaultValue: 'pending'
    },
    sender_pointer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    receiver_pointer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    open_payments_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    metadata: {
        type: DataTypes.JSONB,
        defaultValue: {}
    }
}, {
    tableName: 'transactions'
});

export default Transaction;