import prisma from "../prisma.js";


export const createLead = async (req, res) => {
    const lead = await prisma.lead.create({
        data: {...req.body, userId: req.user.id }
    });
    res.status(201).json(lead);
};


export const getLeads = async (req, res) =>{
    const {page = 1, limit = 20, status, city } = req.query;

    const skip = (page - 1) * limit;

    const where = {};

    if(status) where.status = status;

    if(city) where.city = {contains: city};


    const [data, total] = await Promise.all([
        prisma.lead.findMany({where, skip: +skip, take: +limit}),
        prisma.lead.count({where})
    ]);

    res.json({data, page: +page, limit: +limit, total, totalPages: Math.ceil(total / limit)});
};


export const getLead = async (req, res) =>{
    const lead = await prisma.lead.findUnique({where: {id: +req.params.id}});

    if(!lead) return res.status(404).json({message: "Not found"});
    res.json(lead);
};



export const updateLead = async (req, res) =>{
    const lead = await prisma.lead.update({
        where: {id: +req.params.id},
        data: req.body
    });
    res.json(lead);
};
