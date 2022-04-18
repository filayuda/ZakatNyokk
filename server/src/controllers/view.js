const { view } = require('../../models')

exports.addView = async (req, res) => {
    try {
        const { id } = req.params;
        const viewLink = await view.create({
            link_id: id,
            views: req.body.views
        })

        res.send({
            status: 'success',
            data: {
                viewLink
            },
        })
    } catch (error) {
        res.status(400).send({
            status: 'Bad Request',
            message: error
        })
    }
}

exports.getViewId = async (req, res) => {
    try {
        const { id } = req.params;
        const viewId = await view.findOne({ where: { id: id } });

        res.send({
            status: 'success',
            data: {
                viewId
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            massage: error
        })
    }
}

exports.updateView = async (req, res) => {
    try {
        const { id } = req.params

        await view.update({
            views: req.body.view
        }, { where: { id: id } })

        const patchView = await view.findOne({ where: { id: id } });
        res.send({
            status: 'success',
            data: {
                patchView
            }
        })

    } catch (error) {
        res.status(400).send({
            status: 'Bad Request',
            message: error,
        })
    }
}