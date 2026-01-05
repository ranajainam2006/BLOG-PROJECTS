const bcrypt = require('bcryptjs')

exports.plainToHash = async (password) =>{

    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(password, salt)
}



exports.hashToPlain = async (password, hashPass) =>{

    return await bcrypt.compare(password, hashPass)
    
}