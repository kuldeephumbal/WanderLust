const Listing = require("../models/listing.js");

module.exports.lists = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/lists.ejs", { listings });
}

module.exports.renderNewListing =  (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("warning", "Please log in to create a new listing.");
        return res.redirect("/login");
    }
    res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = { url, filename };
    await listing.save();
    req.flash("success", "New listing created successfully.");
    res.redirect("/listings");
}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    }).populate("owner");
    // console.log(listing);
    if (!listing) {
        req.flash("error", "Listing not found.");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

module.exports.renderEditListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found.");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true, new: true });
    if (typeof req.file !== "undefined") {  
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save(); 
    }
    req.flash("success", "Successfully updated the listing.");
    res.redirect(`/listings/${ id }`);
}

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    let deleteList = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing has been deleted successfully.");
    console.log(deleteList);
    res.redirect("/listings");
}