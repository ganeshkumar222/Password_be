let homePage = (req,res)=>{
    try {
        res.status(200).send({
            message:"Welcome to Password reset flow"
        })
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
export default {
    homePage
}