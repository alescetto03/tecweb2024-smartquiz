/**
 * //TODO::Scrivere il contratto di questo metodo
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export function exportFlashMessagesToViews(req, res, next) {
    res.locals.errors = req.flash("error");
    res.locals.successes = req.flash("success");
    next();
}