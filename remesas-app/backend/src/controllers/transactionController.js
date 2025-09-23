import models from '../models/index.js';

export const createTransaction = async (req, res) => {
    try {
        const { amount, currency, description, receiver_pointer, type } = req.body;
        const userId = req.userId;

        // Validar saldo suficiente para envíos
        if (type === 'send') {
            const user = await models.User.findByPk(userId);
            if (user.balance < amount) {
                return res.status(400).json({
                    success: false,
                    message: 'Saldo insuficiente'
                });
            }
        }

        // Crear transacción
        const transaction = await models.Transaction.create({
            amount,
            currency: currency || 'USD',
            description,
            type: type || 'send',
            receiver_pointer,
            user_id: userId,
            status: 'pending'
        });

        // Si es un envío, restar del balance
        if (type === 'send') {
            await models.User.decrement('balance', {
                by: amount,
                where: { id: userId }
            });
        }

        // Simular procesamiento con Open Payments (aquí iría la integración real)
        setTimeout(async () => {
            transaction.status = 'completed';
            await transaction.save();

            // Si es una recepción, sumar al balance
            if (type === 'receive') {
                await models.User.increment('balance', {
                    by: amount,
                    where: { id: userId }
                });
            }
        }, 2000);

        res.status(201).json({
            success: true,
            message: 'Transacción creada exitosamente',
            data: { transaction }
        });

    } catch (error) {
        console.error('Error creando transacción:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const userId = req.userId;
        const { page = 1, limit = 10, type } = req.query;

        const whereClause = { user_id: userId };
        if (type) whereClause.type = type;

        const transactions = await models.Transaction.findAndCountAll({
            where: whereClause,
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
        });

        res.json({
            success: true,
            data: {
                transactions: transactions.rows,
                total: transactions.count,
                page: parseInt(page),
                totalPages: Math.ceil(transactions.count / parseInt(limit))
            }
        });

    } catch (error) {
        console.error('Error obteniendo transacciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};