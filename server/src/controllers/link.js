const { link, transaction } = require('../../models')

exports.addLink = async (req, res) => {
    try {
        // const account_id = req.user.id;
        // const { id } = req.params;
        const data = { 
            picture : req.file.filename,
            title : req.body.title,
            description : req.body.description,
            link1 : req.body.link1, 
            link2 : req.body.link2, 
            link3 : req.body.link3, 
            link4 : req.body.link4, 
            link5 : req.body.link5, 
            account_id : req.user.id, 
            // template_id : req.params,
        }

        console.log(req.body);
      const createBook = await link.create(data)
    //   console.log(data);


      let bookData = await link.findOne({ 
          where : { 
              id : createBook.id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
      })


      bookData = JSON.parse(JSON.stringify(bookData))
    //   console.log(bookData);
        // console.log(createLink);

        res.status(200).send({
            status: 'success',
            data: {
                ...bookData,
                 picture: "http://localhost:5000/uploads" + bookData.picture,
            },
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "failed",
            message: "Server Error",
        });
    }
}


exports.addLinkTransaction = async (req, res) => {
    try {
        // const account_id = req.user.id;
        // const { id } = req.params;
        const data = { 
            name : req.body.name,
            tanggal : req.body.tanggal,
            idZakat  : req.body.idZakat,
            // idZakat  : req.user.id,
            payment : req.body.payment,
            amil : req.body.amil,
            idUser: req.user.id,
        }

        console.log(req.body);
      const createBook = await transaction.create(data)
    //   console.log(data);


      let bookData = await transaction.findOne({ 
          where : { 
              id : createBook.id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
      })


      bookData = JSON.parse(JSON.stringify(bookData))
    //   console.log(bookData);
        // console.log(createLink);

        res.status(200).send({
            status: 'success',
            data: {
                ...bookData,
            },
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.getLinkId = async (req, res) => {
    try {
        const account_id = req.user.id;
        const linkId = await link.findAll({ where: { account_id: account_id } });

        res.send({
            status: 'success',
            data: {
                linkId
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            massage: error
        })
    }
}

exports.getLink = async (req, res) => {
    try {
        const { id } = req.params;
        const linkId = await link.findOne({ where: { id: id } });

        res.send({
            status: 'success',
            data: {
                linkId
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            massage: error
        })
    }
}

exports.updateLink = async (req, res) => {
    try {
        const data = req.body;
        const image = req.files.picture[0].filename;
        const { id } = req.params;

        console.log(data);
        await link.update({
            picture: image,
            title: data.title,
            description: data.description,
            link1: data.link1,
            link2: data.link2,
            link3: data.link3,
            link4: data.link4,
            link5: data.link5,
        }, { where: { id: id } })

        const patchLink = await link.findOne({ where: { id: id } });
        res.send({
            status: 'success',
            data: {
                patchLink
            }
        })

    } catch (error) {
        res.status(400).send({
            status: 'Bad Request',
            message: error,
        })
    }
}

exports.deleteLink = async (req, res) => {
    try {
        const { id } = req.params;

        await link.destroy({ where: { id: id } });

        res.send({
            status: 'success',
            data: {
                deleteLink: id
            }
        })
    } catch (error) {
        res.status(400).send({
            status: 'failed',
            massage: error
        })
    }
}