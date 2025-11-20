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
