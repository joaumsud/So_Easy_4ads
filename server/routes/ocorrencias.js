const express = require("express");
const router = express.Router();
const multer = require("multer");

const login = require("../middleware/Login");
const OcorrenciasController = require("../controllers/ocorrencias-controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
});

router.get("/", login.obrigatorio, OcorrenciasController.getOcorrencias);
router.get(
    "/:id",
    login.obrigatorio,
    OcorrenciasController.getOcorrenciasPorIdAluno
);
router.put(
    "/:id",
    login.obrigatorio,
    upload.single("file"),
    OcorrenciasController.updateOcorrencia
);
router.delete(
    "/:id",
    login.obrigatorio,
    OcorrenciasController.deleteOcorrencia
);
router.post(
    "/",
    login.obrigatorio,
    upload.single("file"),
    OcorrenciasController.postOcorrencia
);

module.exports = router;
