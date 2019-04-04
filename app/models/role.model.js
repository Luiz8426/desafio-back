const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
    nome: {type: String,required:true},
    dia: {type:String,required: true},
    hora: {type:String,required: true},
    local: {type:String,required: true},
    valor: {type:Number,required: true},
    acompanhado: {type:String,required: true},
    qtdePessoas: {type:Number,required: true},
    avaliacao: {type:Number,required: true}
    })

module.exports = mongoose.model('Role',RoleSchema)