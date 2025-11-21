import { User } from "../models/index.js";

export const meController = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ["id", "email", "is_active", "createdAt", "last_login"], include: ["role"] });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const toUpdate = {};
    if (req.body.email) toUpdate.email = req.body.email;
    // otros campos: avatar, bio si existieran

    await User.update(toUpdate, { where: { id: req.user.id } });
    const user = await User.findByPk(req.user.id, { attributes: ["id", "email"] });
    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Admin: listar todos los usuarios
export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "email", "is_active", "createdAt", "last_login"], include: ["role"], order: [["createdAt", "DESC"]] });
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Admin: obtener usuario por id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ["id", "email", "is_active", "createdAt", "last_login"], include: ["role"] });
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Admin: actualizar usuario por id
export const updateUserById = async (req, res) => {
  try {
    const toUpdate = {};
    if (req.body.email) toUpdate.email = req.body.email;
    if (typeof req.body.is_active !== 'undefined') toUpdate.is_active = req.body.is_active;
    if (req.body.role_id) toUpdate.role_id = req.body.role_id;

    const [updated] = await User.update(toUpdate, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ msg: 'User not found or nothing to update' });
    const user = await User.findByPk(req.params.id, { attributes: ["id", "email", "is_active", "createdAt", "last_login"], include: ["role"] });
    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Admin: eliminar usuario por id
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    await user.destroy();
    return res.json({ msg: 'User deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
