const LocalStrategy = require('passport-local').Strategy;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// const User = require('../models/user');

const bcrypt = require('bcrypt');

module.exports = function (passport) {
	// Local Strategy
	passport.use(new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
		try {
			const user = await prisma.user.findFirst({ where: { email } });
			if (!user)
			return done(null, false, {
			message: "User email not found",
			statusCode: 400
			});
	
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword)
			return done(null, false, {
			message: "Incorrect password, please try again.",
			statusCode: 401
			});
			return done(null, user);
		} catch (err) {
			console.error(err.message);
			return done(null, err);
		}
	}))
	
	
	
	passport.serializeUser((user, done) => {
		done(null, user.id);
	  });
	
	passport.deserializeUser((id, done) => {
		prisma.user.findFirst({ where: { id } })
		.then((user) => { done(null, user); });
	
	});

	// passport.deserializeUser((id, done) => {
	// 	prisma.user.findFirst({ where: { id } }, async (user) => {
	// 		done(await user);
	// 	})	
	// });

	// passport.deserializeUser((id, done) => {
	// 	User.findById(id, function (err, user) {
	// 	  done(err, user);
	// 	});
	//   });
}



// Match Username
    // let query = { email: email };
//     await prisma.user.findFirst({ where: { email } }, (err, user) => {
//       if (err) throw err;
//       if (!user) {
//         return done(null, false, { message: 'User email not found' });
//       }

//       // Match Password
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) throw err;
//         if (isMatch) {
//           return done(null, user);
//         } else {
//           return done(null, false, { message: 'Incorrect password, please try again' });
//         }
//       });
//     });
//   }));
