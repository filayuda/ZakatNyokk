const {transaction, account, type, link } = require('../../models')

exports.addTransaction = async (req, res) => { 
    try {
        const data = { 
            name : req.body.name,
            tanggal : req.body.tanggal,
            idZakat  : req.body.idZakat,
            // idZakat  : req.user.id,
            payment : req.body.payment,
            amil : req.body.amil,
            idUser: req.user.id, 
        }
        console.log(req.body)

        const createTransaction = await transaction.create(data)
        // console.log(data)

        let getTransaction = await transaction.findOne({ 
            where: { 
                id: createTransaction.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        })

        getTransaction = JSON.parse(JSON.stringify(getTransaction))
        // console.log(getTransaction)

        res.status(200).send({ 
            status: "Success", 
            data: { 
                ...getTransaction,
            },
        })
    } catch (error) {
        console.log(error); 
        res.status(200).send({ 
            status: "Failed",
            message: "Server Error"
        })
    }
}

// exports.addTransaction = async (req, res) => {
//     try {
//         // const account_id = req.user.id;
//         // const { id } = req.params;
//         const data = { 
//             title : req.body.name,
//             tanggal : req.body.tanggal,
//             idZakat : req.body.idZakat,
//             payment : req.body.payment,
//             description : req.body.amil,
//             account_id : req.user.id, 
//             // template_id : req.params,
//         }

//         console.log(req.body);
//       const createBook = await link.create(data)
//     //   console.log(data);


//       let bookData = await link.findOne({ 
//           where : { 
//               id : createBook.id,
//           },
//           attributes: {
//             exclude: ["createdAt", "updatedAt"],
//           },
//       })


//       bookData = JSON.parse(JSON.stringify(bookData))
//     //   console.log(bookData);
//         // console.log(createLink);

//         res.status(200).send({
//             status: 'success',
//             data: {
//                 ...bookData,
//             },
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(200).send({
//             status: "failed",
//             message: "Server Error",
//         });
//     }
// }

exports.takeTransactions = async(req, res) => { 
    try {
        const transactions= await transaction.findAll({ 
            include : {
                model: account, 
                as: "account",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                 },
            },
            include : {
                model: type, 
                as: "type",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                 },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        })
        res.status(200).send({ 
            status: "Succses",
            data : {
                transactions,
            },
        })
    } catch (error) {
        console.log(error); 
        res.status(200).send({ 
            status : "Failed",
            message: error
        })
    }
}

exports.takeTransaction = async(req, res) => {
    try {
        const {id} = req.params
        const transactionGet = await transaction.findOne({ 
            where : {
                id, 
            }, 
            include : {
                model: account, 
                as: "account",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                 },
            },
            include : {
                model: type, 
                as: "type",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                 },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        })

        res.status(200).send({
            status : "Succsess",
            data : { 
                transactionGet
            }, 
        })

    } catch (error) {
        console.log(error); 
        res.status(200).send({ 
            status : "Failed",
            message: error
        })
    }
}

exports.editTransaction = async(req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;

        await transaction.update( { 
            name : data.name, 
            tanggal: data.tanggal, 
            idZakat: data.idZakat, 
            payment: data.payment,
            amil: data.amil,
        }, {
            where: {
                id
            }
        })

        const getUpdate = await transaction.findOne({ 
            where : { 
                id,
            },
        })

        res.status(200).send({ 
            status : "Success",
            data : {
                getUpdate
            }
        })
    } catch (error) {
        console.log(error); 
        res.status(200).send({ 
            status : "Failed",
            message: error
        })
    }
}


exports.deleteTransaction = async(req, res) => {
    try {
        const {id} = req.params; 

        await transaction.destroy({
            where : { 
                id
            }
        })

        res.status(200).send({
            status : "Success", 
            data : {
                
            }
        })

    } catch (error) {
        console.log(error); 
        res.status(200).send({ 
            status : "Failed",
            message: error
        })
    }
}