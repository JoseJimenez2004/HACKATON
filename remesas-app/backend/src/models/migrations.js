import models from '../models/index.js';

const syncDatabase = async () => {
    try {
        // Sincronizar modelos con la base de datos
        await models.sequelize.sync({ force: false, alter: true });
        console.log('✅ Modelos sincronizados con la base de datos');
        
        // Crear usuario admin de prueba si no existe
        const { User } = models;
        const adminExists = await User.findOne({ where: { email: 'admin@finanzas.com' } });
        
        if (!adminExists) {
            await User.create({
                email: 'admin@finanzas.com',
                password: 'admin123',
                full_name: 'Administrador Finanzas',
                phone: '+1234567890',
                balance: 10000.00,
                is_verified: true
            });
            console.log('👤 Usuario admin creado: admin@finanzas.com / admin123');
        }
        
    } catch (error) {
        console.error('❌ Error sincronizando base de datos:', error);
        process.exit(1);
    }
};

export default syncDatabase;