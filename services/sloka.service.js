const Sloka = require('../models/sloka.model');

exports.addSlokas = async (payload) => {
  try {
    if (Array.isArray(payload)) {
      // Bulk insert; Mongoose runs schema validation on each document
      const inserted = await Sloka.insertMany(payload, { ordered: true });
      return inserted;
    }

    const sloka = new Sloka(payload);
    const savedSloka = await sloka.save();
    return savedSloka;
  } catch (error) {
    if (error?.code === 11000) {
      throw new Error('Duplicate key error while adding sloka(s)');
    }
    throw new Error(`Error adding sloka(s): ${error?.message || error}`);
  }
};

exports.getAllSlokas = async () => {
  try {
    const slokas = await Sloka.find()
      .sort({ createdAt: -1 });  // Sort by newest first
    
    return slokas;
  } catch (error) {
    throw new Error(`Error fetching slokas: ${error.message}`);
  }
};

exports.deleteSlokasByFilter = async (filters) => {
  try {
    // filters can be array of { chapterNumber, slokaNumber } or single object
    if (Array.isArray(filters)) {
      const deletePromises = filters.map(filter => 
        Sloka.deleteMany({
          chapterNumber: filter.chapterNumber,
          slokaNumber: filter.slokaNumber
        })
      );
      const results = await Promise.all(deletePromises);
      const totalDeleted = results.reduce((sum, r) => sum + r.deletedCount, 0);
      return { deletedCount: totalDeleted };
    }
    
    // Single filter object
    const result = await Sloka.deleteMany({
      chapterNumber: filters.chapterNumber,
      slokaNumber: filters.slokaNumber
    });
    return result;
  } catch (error) {
    throw new Error(`Error deleting slokas by filter: ${error.message}`);
  }
};

exports.deleteAllSlokas = async () => {
  try {
    const result = await Sloka.deleteMany({});
    return result;
  } catch (error) {
    throw new Error(`Error deleting all slokas: ${error.message}`);
  }
};

exports.updateSloka = async (id, updateData) => {
  try {
    const updatedSloka = await Sloka.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedSloka) {
      throw new Error("Sloka not found");
    }
    
    return updatedSloka;
  } catch (error) {
    throw new Error(`Error updating sloka: ${error.message}`);
  }
};

exports.getSlokaById = async (id) => {
  try {
    const sloka = await Sloka.findById(id);
    
    if (!sloka) {
      throw new Error("Sloka not found");
    }
    
    return sloka;
  } catch (error) {
    throw new Error(`Error fetching sloka: ${error.message}`);
  }
};
