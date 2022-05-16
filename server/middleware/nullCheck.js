
function nullCheck(req, res, next) {
    if (!req.body) return
    let messages = "";

    Object.entries(req.body).forEach((a, index) => {
        if (typeof a[1] == 'object') return;
        if (a[1] == null || a[1].toString()?.replace(/\s/g, '') == "") {
            messages += `${a[0]?.toLowerCase()} is required \n`;
        }
    });
    if (!messages) next()
    else return res.json({ success: false, message: messages });

}


module.exports = nullCheck 