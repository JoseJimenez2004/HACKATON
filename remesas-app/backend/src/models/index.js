import sequelize from '../config/database.js';
import User from './User.js';
import Transaction from './Transaction.js';

// Definir relaciones
User.hasMany(Transaction, { 
    foreignKey: 'user_id', 
    as: 'transactions' 
});
Transaction.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'user' 
});

const models = {
    User,
    Transaction,
    sequelize
};

export default models;