const userService = require("../services/user.svc")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { formatDistanceToNow } = require("date-fns")

const userCtrl = {
    register: async (req, res) => {
        try {
            const userInfo = await userService.getByEmail(req.body.email)
            if (userInfo) {
                res.status(400)
                res.send({ error: "conflict", errorDiscription: "Email Already Exists !! , please try another Email" });
            }
            else {
                const hashedPassword = await bcrypt.hash(req.body.password, 5)
                req.body.password = hashedPassword
                const user = await userService.add(req.body)
                res.status(201)
                res.send({ data: user })
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.send({ error });
        }
    },
    login: async (req, res) => {
        try {
            const userInfo = await userService.getByEmail(req.body.email);
            if (userInfo) {
                const isPasswordMatched = await bcrypt.compare(req.body.password, userInfo.password);
                if (isPasswordMatched) {
                    const token = await jwt.sign({ email: userInfo.email, userId: userInfo._id }, "You Cant Hack My Password", { expiresIn: "1h" })
                    res.status(200);
                    res.send({
                        data: {
                            userId: userInfo._id,
                            email: userInfo.email
                        }, token
                    });
                } else {
                    const promises = userInfo.previousPasswords.map(async (passwordInfo) => {
                        const isPasswordMatched = await bcrypt.compare(req.body.password, passwordInfo.password);
                        if (isPasswordMatched) {
                            const date = new Date(passwordInfo.createdAt);
                            return formatDistanceToNow(date, { addSuffix: true });
                        }
                        return null; // or some other value if password doesn't match
                    });

                    Promise.all(promises)
                        .then((timeAgoArray) => {
                            timeAgoArray = timeAgoArray.filter(time => time !== null);
                            if (timeAgoArray.length > 0) {
                                res.status(409);
                                res.send({ error: 'Conflict', errorDescription: `Password has been changed ${timeAgoArray[timeAgoArray.length - 1]}` });
                            } else {
                                res.status(409);
                                res.send({ error: 'Conflict', errorDescription: `Incorrect password` });
                            }
                        })
                        .catch((error) => {
                            console.error('An error occurred:', error);
                        });
                }
            } else {
                res.status(409);
                res.send({ error: 'Conflict', errorDescription: 'User doesnot exist with this email address' });
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ error });
        }
    },
    sendEmail: async (req, res) => {
        try {
            const userInfo = await userService.getByEmail(req.body.email)
            if (userInfo) {
                const emailInfo = await mailerService.sendEmail(userInfo)
                res.status(200)
                res.send({ data: emailInfo })
            }
            else {
                res.status(409)
                res.send({ error: "conflict", errorDiscription: "User Doesn't exist with this Email !!" });
            }
        } catch (error) {
            res.status(500)
            res.send({ error })
        }
    },
    updatePassword: async (req, res) => {
        try {
            const userInfo = await userService.getByEmail(req.body.email)
            const previousPasswords = [...userInfo.previousPasswords, { password: userInfo.password, createdAt: userInfo.passwordCreatedAt }]
            const hashedPassword = await bcrypt.hash(req.body.password, 5)
            req.body.password = hashedPassword
            const updatedUserInfo = await userService.updatePassword({ ...req.body, passwordCreatedAt: new Date().toISOString(), previousPasswords })
            res.status(200)
            res.send({ status: "Updated the password successfully", data: updatedUserInfo })
        } catch (error) {
            console.log(error)
            res.status(500)
            res.send({ error })
        }
    }
}

module.exports = userCtrl