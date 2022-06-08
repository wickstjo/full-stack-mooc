const funcs = require('./funcs.js');

// EXTRACT RUNTIME ARGS
const args = process.argv.slice(2, process.argv.length)

switch (args.length) {

    // 1 ARG -- FETCH ALL USERS
    case 1: {
        console.log('Phonebook:')
        funcs.fetch_people(args).then(people => {
            people.forEach(person => {
                console.log(`${ person.name }: ${ person.number }`)
            })
        })
    } break

    // 3 ARGS -- CREATE USER
    case 3: {
        funcs.create_person(args).then(() => {
            console.log(`Added "${ args[1] }" under number "${ args[2] }" to phonebook!`)
        })
    } break

    // FALLBACK
    default: {
        console.log('NOT ENOUGH PARAMETERS GIVEN!')
    }
}













// MONGO CONNECTION STRING
// const url = `mongodb://${ env.USER }:${ env.PASS }@localhost:${ env.PORT }`

// mongoose.connect(url)
//     .then((result) => {
//         console.log('connected')

//         const note = new Note({
//             content: 'HTML is Easy',
//             date: new Date(),
//             important: true,
//         })

//         return note.save()
//     })
//     .then(() => {
//         console.log('note saved!')
//         return mongoose.connection.close()
//     })
//     .catch((err) => {
//         console.log(err);
//     })




    // Note.find({}).then(result => {
    //     result.forEach(note => {
    //       console.log(note)
    //     })
    //     mongoose.connection.close()
    // })

    // Note.find({ important: true }).then(result => {
    //     // ...
    // })