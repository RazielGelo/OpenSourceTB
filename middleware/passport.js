const LocalStrategy = require('passport-local').Strategy

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// const User = require('../models/user');

const bcrypt = require('bcrypt')

module.exports = function (passport) {
	// Local Strategy
	passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			const user = await prisma.user.findFirst({ where: { email } })
			if (!user)
				return done(null, false, {
					message: "Sorry, we can't find an account with this email address. Please try again or create a new account.",
					statusCode: 400
				});

			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword)
				return done(null, false, {
					message: "Login Failed! Your password is incorrect. Please try again.",
					statusCode: 401
				});
			return done(null, user)
		} catch (err) {
			console.error(err.message);
			return done(null, err)
		}
	}))
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser((id, done) => {
		prisma.user.findFirst({ where: { id } })
			.then((user) => { done(null, user); })

	})
}