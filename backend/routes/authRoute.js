import express from 'express';

const router = express.Router();

router.get("/login", (req,res) => {
    res.json({
        "message" : "route is working"
    })
});

export default router;