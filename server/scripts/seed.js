import dotenv from 'dotenv';
import User from '../models/User.js';
import { hashPassword } from '../utils/password.js';
import { connectDB } from '../lib/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD é obrigatório em produção.');
      process.exit(1);
    }

    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@email.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin já existe');
      process.exit(0);
    }

    const hashedPassword = await hashPassword(adminPassword);

    const admin = new User({
      name: 'Administrador',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin criado com sucesso!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Senha: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar admin:', error);
    process.exit(1);
  }
};

seedAdmin();

