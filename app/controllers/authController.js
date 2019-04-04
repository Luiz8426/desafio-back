const express = require('express')
const Role = require('../models/role.model')
const router = express.Router()

// REGISTRAR
    router.post('/create',async(req,res)=>{
        try{
            const role = await Role.create(req.body)
            
            return res.status(201).send({role})
        }catch(err){
            if(err.message.includes('is required')){
                return res.status(400).send({error:`Some attribute is missing : ${err.message} `})
            }
            return res.status(500).send({error: `Registration failed :${err}`})
        }
    })

//VISUALIZAR TODOs
    router.get('/read/',async(req,res)=>{
        try{
            const roles = await Role.find()
            if(roles.length<1) return res.status(204).send({roles})
            return res.status(200).send(roles)
        }catch(err){
            return res.status(500).send({error: `Some error occurred while retrieving roles : ${err}`})
        }
    })

//VISUALIZAR POR ID
    router.get('/read/:roleId',async(req,res)=>{
        try{
            const role = await Role.findById(req.params.roleId)
            return res.status(200).send({role})
        }catch(err){
            if(err.kind === 'ObjectId')
                return res.status(404).send({error:'Role not found'})
            return res.status(500).send({error: `Unable to get ROLE : ${err}`})
        }
    })

//EDITAR 
    router.put('/edit/:roleId',async(req,res)=>{
        try{
            Role.findById(req.params.roleId,function(err,role){
                if(role==null) return res.status(404).send({error:`Role not found`})
                role.nome = req.body.nome;
                role.dia = req.body.dia;
                role.hora = req.body.hora;
                role.local = req.body.local;
                role.valor = req.body.valor;
                role.acompanhado = req.body.acompanhado;
                role.qtdePesoas= req.body.qtdePesoas;
                role.avaliacao = req.body.avaliacao;
                role.save()
                    .then(resp=>{
                        return res.status(200).send({message:"Role edited"})
                    })
                    .catch(err=>{
                        if(err.message.includes('is required')){
                            return res.status(400).send({error:
                                `Some attribute is missing : ${err.message} `})
                        }
                        return res.status(500).send({error:`Role can't be changed: ${err}`})
                    }) 
            })
        }catch(err){
            return res.status(500).send({error: `Error updating role:${err}`})
        }
    })
//DELETAR
    router.delete('/delete/:roleId',async(req,res)=>{
        try{
            const role = await Role.findByIdAndDelete(req.params.roleId)
            if(!role)
                return res.status(404).send({error:'Role not found'})
            return res.status(200).send({message:'Role deleted successfully!'})
        }catch(err){
            return res.status(500).send({error:`Could not delete role :${err}`})
        }
    })







//module.exports = app => app.use('/auth',router)
module.exports = app => app.use('/roles',router)
