const { account } = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const data = req.body

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().min(4).required(),
        })

        const { error } = schema.validate(data)

        if (error) {
            return res.status(200).send({
                status: 'Bad Request',
                message: error.details[0].message
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(data.password, salt)

        const cerateAccount = await account.create({
            email: data.email,
            password: hasedPassword,
            name: data.name,
        })

        const token = jwt.sign({ id: cerateAccount.id }, process.env.TOKEN_KEY);

        res.status(200).send({
            status: 'success',
            data: {
                cerateAccount,
                token
            }
        })

    } catch (error) {
        res.status(400).send({
            status: 'Bad Request',
            message: error.details[0].message
        })
    }
}

exports.login = async (req, res) => {
    const data = req.body

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error)
        return res.status(200).send({
            status: "Bad Request",
            error: {
                message: error.details[0].message,
            },
        });

    try {
        const loginAccount = await account.findOne({ where: { email: data.email } });
        const isValid = await bcrypt.compare(data.password, loginAccount.password);

        if (!isValid) {
            return res.status(200).send({
                status: "Bad Request",
                message: error.details[0].message,
            });
        }

        const token = jwt.sign({ id: loginAccount.id }, process.env.TOKEN_KEY);

        res.status(200).send({
            status: "success",
            data: {
                loginAccount,
                token
            }
        })

    } catch (error) {
        res.status(400).send({
            status: "Bad Request",
            message: error
        })
    }
}

exports.getAccountId = async (req, res) => {
    try {
        const id = req.user.id;
        const accountId = await account.findOne({ where: { id: id } });

        res.send({
            status: 'success',
            data: {
                accountId
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            massage: error
        })
    }
}

exports.updateAccount = async (req, res) => {
    try {
        const id = req.user.id
        const data = req.body;

        await account.update({
            name: data.name,
            email: data.email,
        }, { where: { id: id } })

        const patchAccount = await account.findOne({ where: { id: id } });
        res.send({
            status: 'success',
            data: {
                patchAccount
            }
        })

    } catch (error) {
        res.status(400).send({
            status: 'Bad Request',
            message: error,
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id

        const akun = await account.findOne({ where: { id: id } });
        await account.destroy({ where: { id: akun.id } });

        res.send({
            status: 'success',
            data: {
                deleteAccount: id
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            massage: error
        })
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataAccount = await account.findOne({ where: { id: id } });

        if (!dataAccount) {
            return res.status(404).send({
                status: "failed",
            });
        }

        res.send({
            status: "success",
            data: {
                dataAccount
            },
        });
    } catch (error) {
        console.log(error);
        res.status({
            status: "failed",
            message: error,
        });
    }
};