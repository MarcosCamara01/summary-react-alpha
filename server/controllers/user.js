const bcrypt = require("bcrypt");
const mongoosePagination = require("mongoose-pagination");
const fs = require("fs");
const path = require("path");

const User = require("../models/user");

const jwt = require("../services/jwt");
const validate = require("../helpers/validate");

const register = async (req, res) => {
    let params = req.body;

    if (!params.name || !params.email || !params.password) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar",
        });
    }

    try {
        validate(params);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Validación no superada",
        });
    }

    try {
        const users = await User.find({
            $or: [{ email: params.email.toLowerCase() }],
        }).exec();

        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe",
            });
        }

        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        const user_to_save = new User(params);
        const userStored = await user_to_save.save();

        if (!userStored) {
            return res.status(500).send({
                status: "error",
                message: "Error al guardar el usuario",
            });
        }

        userStored.toObject();
        delete userStored.password;
        delete userStored.role;

        return res.status(200).json({
            status: "success",
            message: "Usuario registrado correctamente",
            user: userStored,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en la consulta de usuarios",
        });
    }
};

const login = (req, res) => {
    let params = req.body;

    if (!params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar",
        });
    }

    User.findOne({ email: params.email })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe el usuario",
                });
            }

            const pwd = bcrypt.compareSync(params.password, user.password);

            if (!pwd) {
                return res.status(400).send({
                    status: "error",
                    message: "No te has identificado correctamente",
                });
            }

            const token = jwt.createToken(user);

            return res.status(200).send({
                status: "success",
                message: "Te has identificado correctamente",
                user: {
                    id: user._id,
                    name: user.name,
                },
                token,
            });
        })
        .catch((error) => {
            return res.status(500).send({
                status: "error",
                message: "Error en la consulta de usuarios",
            });
        });
};

const profile = async (req, res) => {
    const id = req.params.id;

    try {
        const userProfile = await User.findById(id).select({ password: 0, role: 0 }).exec();

        if (!userProfile) {
            return res.status(404).send({
                status: "error",
                message: "El usuario no existe o hay un error"
            });
        }

        return res.status(200).send({
            status: "success",
            user: userProfile,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en la consulta de usuarios",
        });
    }
};

const update = async (req, res) => {
    let userIdentity = req.user;
    let userToUpdate = req.body;

    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    try {
        const users = await User.find({
            $or: [{ email: userToUpdate.email.toLowerCase() }],
        }).exec();

        let userIsset = false;
        users.forEach((user) => {
            if (user && user._id != userIdentity.id) userIsset = true;
        });

        if (userIsset) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe",
            });
        }

        if (userToUpdate.password) {
            let pwd = await bcrypt.hash(userToUpdate.password, 10);
            userToUpdate.password = pwd;
        } else {
            delete userToUpdate.password;
        }

        const userUpdated = await User.findByIdAndUpdate(
            { _id: userIdentity.id },
            userToUpdate,
            { new: true }
        );

        if (!userUpdated) {
            return res.status(400).json({ status: "error", message: "Error al actualizar" });
        }

        return res.status(200).send({
            status: "success",
            message: "Metodo de actualizar usuario",
            user: userUpdated,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al actualizar",
        });
    }
};

const upload = (req, res) => {
    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "Petición no incluye la imagen",
        });
    }

    let image = req.file.originalname;

    const imageSplit = image.split(".");
    const extension = imageSplit[1];

    if (
        extension != "png" &&
        extension != "jpg" &&
        extension != "jpeg" &&
        extension != "gif"
    ) {
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);

        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero inválida",
        });
    }

    User.findOneAndUpdate(
        { _id: req.user.id },
        { image: req.file.filename },
        { new: true }
    )
        .exec()
        .then((userUpdated) => {
            if (!userUpdated) {
                return res.status(500).send({
                    status: "error",
                    message: "Error en la subida del avatar",
                });
            }

            return res.status(200).send({
                status: "success",
                user: userUpdated,
                file: req.file,
            });
        })
        .catch((error) => {
            return res.status(500).send({
                status: "error",
                message: "Error en la subida del avatar",
            });
        });
};

const avatar = (req, res) => {
    const file = req.params.file;

    const filePath = "./uploads/avatars/" + file;

    fs.stat(filePath, (error, exists) => {
        if (error || !exists) {
            return res.status(404).send({
                status: "error",
                message: "No existe la imagen",
            });
        }

        return res.sendFile(path.resolve(filePath));
    });
};

module.exports = {
    register,
    login,
    profile,
    update,
    upload,
    avatar,
};
