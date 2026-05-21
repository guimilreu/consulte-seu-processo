import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword, validatePassword } from "../utils/password.js";
import { getAuthCookieOptions } from "../utils/cookieOptions.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email e senha são obrigatórios" });
		}

		const normalizedEmail = email.toLowerCase().trim();
		const user = await User.findOne({ email: normalizedEmail });

		if (!user) {
			return res.status(401).json({ error: "Email ou senha incorretos" });
		}

		if (!user.password) {
			return res.status(401).json({ error: "Email ou senha incorretos" });
		}

		if (!user.isActive) {
			return res.status(401).json({ error: "Conta inativa" });
		}

		const isValidPassword = await comparePassword(password, user.password);

		if (!isValidPassword) {
			return res.status(401).json({ error: "Email ou senha incorretos" });
		}

		const token = generateToken({ userId: user._id, role: user.role });

		const { password: _, passwordSetupToken, passwordSetupExpires, ...userWithoutPassword } = user.toObject();

		res.cookie("token", token, getAuthCookieOptions());

		res.json({
			success: true,
			user: userWithoutPassword,
		});
	} catch (error) {
		console.error("Erro no login:", error);
		res.status(500).json({ error: "Erro ao fazer login" });
	}
};

export const setupPassword = async (req, res) => {
	try {
		const { token, password } = req.body;

		if (!token || !password) {
			return res.status(400).json({ error: "Token e senha são obrigatórios" });
		}

		const passwordError = validatePassword(password);
		if (passwordError) {
			return res.status(400).json({ error: passwordError });
		}

		const user = await User.findOne({
			passwordSetupToken: token,
			passwordSetupExpires: { $gt: new Date() },
		});

		if (!user) {
			return res.status(400).json({ error: "Token inválido ou expirado" });
		}

		user.password = await hashPassword(password);
		user.passwordSetupToken = null;
		user.passwordSetupExpires = null;
		await user.save();

		const jwtToken = generateToken({ userId: user._id, role: user.role });

		const { password: _, passwordSetupToken, passwordSetupExpires, ...userWithoutPassword } = user.toObject();

		res.cookie("token", jwtToken, getAuthCookieOptions());

		res.json({
			success: true,
			user: userWithoutPassword,
		});
	} catch (error) {
		console.error("Erro ao definir senha:", error);
		res.status(500).json({ error: "Erro ao definir senha" });
	}
};

export const logout = async (req, res) => {
	const { maxAge, ...clearOptions } = getAuthCookieOptions();
	res.clearCookie("token", clearOptions);
	res.json({ success: true });
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password -passwordSetupToken -passwordSetupExpires");
		res.json({ user });
	} catch (error) {
		console.error("Erro ao buscar usuário:", error);
		res.status(500).json({ error: "Erro ao buscar usuário" });
	}
};
