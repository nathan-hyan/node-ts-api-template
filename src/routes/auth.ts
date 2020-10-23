import router from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import verify from "../middleware/verifyUser";
const authRoute = router.Router();

authRoute.post("/register", async (req, res) => {
  let { name, email, password } = req.body;

  if (await checkIfEmailAlreadyExist(email)) {
    res.status(500).send({ success: false, message: "E-mail already exist" });
  } else {
    const user = new User({
      name,
      email,
      password: await hashPassword(password),
    });

    try {
      await user.save();
      res.send({ success: true, message: "User created" });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  }
});

authRoute.post(`/login`, verify, async (req, res) => {
  let { email, password } = req.body;

  if (
    (await checkIfEmailAlreadyExist(email)) &&
    (await isValidPassword(password, email))
  ) {
    res.header("auth", await createToken(email)).send({ success: true });
  } else {
    res
      .status(401)
      .send({ success: false, message: "Email or password incorrect" });
  }
});

// ------------------------------------------------------------------

/**
 * Checks if the entered email already
 * exists on database
 *
 * @param email Email to check
 * @returns true | false
 */
const checkIfEmailAlreadyExist = async (email: string) => {
  const exist = await User.findOne({ email });

  return !!exist;
};

/**
 * Gets a plain text password and hashes it with
 * salt
 *
 * @param password string - Password to hash
 */
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

/**
 * Checks if the salted password entered by the user
 * matches with the one on the database
 *
 * @param password Password entered by user
 * @param email Email of the user to compare with
 */
const isValidPassword = async (password: string, email: string) => {
  const dbUser: any = await User.findOne({ email });
  if (!dbUser) {
    throw Error("No user found");
  } else {
    return await bcrypt.compare(password, dbUser.password);
  }
};

/**
 * Creates a token to validate calls from
 * the front-end
 *
 * @param userId Id from the loggedIn user
 */
const createToken = async (email: string) => {
  const secretToken = process.env.TOKEN || "no";
  const dbUser: any = await User.findOne({ email });

  if (secretToken === "no" || !dbUser) {
    throw Error("Token or user invalid");
  } else {
    return JWT.sign({ _id: dbUser._id }, secretToken);
  }
};

export default authRoute;
