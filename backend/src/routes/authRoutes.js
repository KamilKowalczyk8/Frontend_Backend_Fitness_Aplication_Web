const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController"); // 👈 Dodaj to
const { validateRegister, validateLogin } = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
//const { User } = require("../models");

router.post("/register", validateRegister, authController.register); // Rejestracja
router.post("/login", validateLogin, authController.login); // Logowanie
router.post("/logout", authController.logout); // Wylogowanie

router.get("/currentUser", authenticate(), async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id, {
      attributes: {
        exclude: ["password", "resetToken", "createdAt", "updatedAt"],
      },
      raw: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie znaleziony",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Błąd pobierania danych użytkownika:", error);
    res.status(500).json({
      success: false,
      message: "Wewnętrzny błąd serwera",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

router.get("/profile", authenticate(), authController.getProfile); // Profil użytkownika

router.get("/admin", authenticate([1]), authController.adminPanel); // Panel administratora

module.exports = router;
