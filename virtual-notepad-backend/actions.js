const { BATCH_SIZE } = require("./constants")
const {Note} = require("./db") 
const {SplayBst} = require("./SplayTree")

const newNotePost = (req,res) => {
    const id = 1
    Note[id]=req.body.name
    const BATCHSIZE = req.body.BATCH_SIZE || BATCH_SIZE
    console.log("here");
    const tree = new SplayBst()
    tree.save("./newTree.json")
    res.status(200).send({"id":id})
}

module.exports = {newNotePost}