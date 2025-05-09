const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@fsopentest.2p8wd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSOpenTest`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
  //process.exit(1)
}

if (process.argv.length > 4) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    id: Math.floor(Math.random() * 1000),
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

