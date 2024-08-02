const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing: joi.object({
        image: joi.object({
            filename: joi.string().default("listingimage"),
            url: joi.string().required(),
        }).required(), 
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        country: joi.string().required(),
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required(),
});