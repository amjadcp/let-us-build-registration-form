const express = require('express')
const app = express()
const fs = require('fs')
const db = require('./utils/dbConnect')
const TeamSchema = require('./models/teamSchema')
require('dotenv').config()
const smtp = require('./utils/smtpConnect')

app.use(express.urlencoded({extended:true}))
app.use('/static', express.static(__dirname+'/static'))  // serve static files
db.connect()

app.get('/', (req, res)=>{
    fs.readFile(__dirname+'/template/form.html', (err, data)=>{
        res.write(data)
        res.end()
    })
})

app.post('/', async(req, res)=>{
    let {name, email, phoneNumber, jsLevel, bringLaptop} = req.body
    // bringLaptop = Boolean(bringLaptop)
    if(bringLaptop==='true') bringLaptop=true
    else bringLaptop=false
    // save the team
    const teams = await TeamSchema.find({}).sort({name:1})
    if(teams.length!==0){
        console.log('here');
        teams.forEach(async team=>{
            const lastTeam = teams[teams.length - 1]
            const membersWithLap = team.membersWithLap.length
            const membersWithoutLap = team.membersWithoutLap.length
            const totalMember = membersWithLap + membersWithoutLap
            console.log(totalMember);
            if(totalMember<3){
                if(bringLaptop===true){
                    team.membersWithLap.push({name, email, phoneNumber, jsLevel, bringLaptop})
                    await team.save()
                }
                else{
                    team.membersWithoutLap.push({name, email, phoneNumber, jsLevel, bringLaptop})
                    await team.save()
                } 
            }else if(team===lastTeam){
                if(bringLaptop===true) await TeamSchema.create({ team: String(parseInt(lastTeam.team)+1), membersWithLap: {name, email, phoneNumber, jsLevel} }) // with lap
                else await TeamSchema.create({ team: String(parseInt(lastTeam.team)+1), membersWithoutLap: {name, email, phoneNumber, jsLevel} }) // without lap
            }
        })
    }else{
        console.log('yesssssss');
        if(bringLaptop===true) await TeamSchema.create({ team: '1', membersWithLap: {name, email, phoneNumber, jsLevel} }) // with lap
        else await TeamSchema.create({ team: '1', membersWithoutLap: {name, email, phoneNumber, jsLevel} }) // without lap
    }
    // smtp.connect(email, 'yesssssssssssssss')
    res.redirect('/')
})

app.listen(8000, ()=>{
    console.log('Running at http://127.0.0.1:8000/');
})
