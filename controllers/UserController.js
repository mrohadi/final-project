const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { users } = require('../models');

exports.register = async (req, res, next) => {
    const { name, username, email, password, role, address, phoneNumber } = req.body;
    try {
        const tempUser = await users.create({ name, username, email, password, role, address, phoneNumber });
        let response = {
            message: "Success creating new user",
            id: tempUser.id,
            name: tempUser.name,
            username: tempUser.username,
            email: tempUser.email,
            role: tempUser.role,
            phoneNumber: tempUser.phoneNumber,
            address: tempUser.address
        }
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const tempUser = await users.findOne({
            where:{
                email
            }
        });
        if (!tempUser){
            throw{
                name: "User Login Error",
                devMessage: `User with email "${email}" not found`
            }
        }
        const isCorrect = comparePassword(password, tempUser.password);
        if (!isCorrect){
            throw{
                name: "Unauthorized",
                devMessage: `Invalid username/password`
            }
        }
        let payload = {
            id: tempUser.id,
            email: tempUser.email
        }
        
        const token = generateToken(payload);

        let response = {
            accessToken: token,
            name: tempUser.name,
            role: tempUser.role,
            id: tempUser.id
        }

        return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
};