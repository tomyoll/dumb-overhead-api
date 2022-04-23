const mongoose = require('mongoose');

const models = require('../models/');

const { ObjectId } = mongoose.Types;

class Provider {
  // CREATE ====================================================================
  /**
   * Provider constructor
   * @param {string} [modelName] - model name
   */
  constructor(modelName) {
    this._ = models[modelName];
  }

  ObjectId(id = null) {
    return new ObjectId(id);
  }

  getDateParams(start, end) {
    const dateParams = [];

    if (start) {
      dateParams.push({
        createdAt: { $gte: new Date(+start) },
      });
    }

    if (end) {
      dateParams.push({
        createdAt: { $lte: new Date(+end) },
      });
    }

    return dateParams;
  }

  /**
   * Create new document
   * @param {object} document - model data
   * @returns {CreateResult} query result
   */
  async createSingle(document) {
    return this._.create(document);
  }

  /**
   * Create new documents
   * @param  {Object[]} documents - models data
   * @param  {SaveOptions} [options={}] - save options
   * @returns {CreateResult} query result
   */
  async createMany(documents, options = {}) {
    return this._.create(documents, options);
  }

  // READ ======================================================================
  /**
   * Get first document that meet the condition
   * @param {FilterQuery} match - match condition
   * @param {Projection} [projection={}] - fields projection
   * @param {QueryOptions} [options] - query options
   * @returns {ReadResult} query result
   */
  async getSingle(match, projection = {}, options = {}) {
    options.lean = true;

    return this._.findOne(match, projection, options).lean();
  }

  /**
   * Get first document that meet the condition
   * @param {ObjectId} id - id of document
   * @param {Projection} [projection={}] - fields projection
   * @param {QueryOptions} [options] - query options
   * @returns {ReadResult} query result
   */
  async getSingleById(id, projection = {}, options = {}) {
    options.lean = true;

    return this._.findById({ _id: ObjectId(id) }, projection, options).lean();
  }

  /**
   * Get all documents that meet the condition
   * @param {FilterQuery} match - match condition
   * @param {Projection} [projection={}] - fields projection
   * @param {QueryOptions} [options] - query options
   * @returns {ReadResult} query result
   */
  async getMany(match = {}, projection = {}, options = {}) {
    options.lean = true;

    return this._.find(match, projection, options).lean();
  }

  /**
   * Aggregation wrapper
   * @param {Object[]} pipeline
   * @returns {Promise<import('mongoose').Aggregate>}
   */
  async aggregation(pipeline = [], options = {}) {
    const result = await this._.aggregate(pipeline).option(options);

    return result;
  }

  /**
   * Count
   * @param {FilterQuery} match - match condition
   * @returns {Promise<Number>}
   */
  async count(match = {}) {
    const result = await this._.countDocuments(match);

    return result;
  }

  // UPDATE ====================================================================
  /**
   * Update existing document
   * @param {FilterQuery} filter - filter condition
   * @param {(UpdateWithAggregationPipeline|UpdateQuery)} update - update data or aggregation
   * @param {QueryOptions} [options={}] - query options
   * @returns {UpdateResult}
   */
  async updateSingle(filter, update, options = {}) {
    return this._.updateOne(filter, update, options);
  }

  /**
   * Update existing document by id
   * @param {ObjectId} id - id of document
   * @param {(UpdateWithAggregationPipeline|UpdateQuery)} update - update data or aggregation
   * @param {QueryOptions} [options={}] - query options
   * @returns {UpdateResult}
   */
  async updateSingleById(id, update, options = {}) {
    return this._.updateOne({ _id: ObjectId(id) }, update, options);
  }

  /**
   * Update existing document
   * @param {FilterQuery} filter - filter condition
   * @param {(UpdateWithAggregationPipeline|UpdateQuery)} update - update data or aggregation
   * @param {QueryOptions} [options={}] - query options
   * @returns {ReadResult}
   */

  async getSingleAndUpdate(filter, update, options = {}) {
    return this._.findOneAndUpdate(filter, update, options).lean();
  }

  /**
   * Update existing documents
   * @param {FilterQuery} filter - filter condition
   * @param {(UpdateWithAggregationPipeline|UpdateQuery)} update - model data
   * @param {QueryOptions} options - query options
   * @returns {UpdateResult}
   */
  async updateMany(filter, update, options = {}) {
    return this._.updateMany(filter, update, options);
  }

  /**
   * Update existing document by id with $set parameter
   * @param {ObjectId} id - id of document
   * @param {(UpdateWithAggregationPipeline|UpdateQuery)} update - update data or aggregation
   * @param {QueryOptions} [options={}] - query options
   * @returns {UpdateResult}
   */
  async setUpdateSingleById(id, update, options = {}) {
    return this._.updateOne({ _id: ObjectId(id) }, { $set: update }, options);
  }

  /**
   * Update existing documents with $set parameter
   * @param {FilterQuery} filter - filter condition
   * @param {(UpdateWithAggregationPipeline|UpdateQuery)} update - model data
   * @param {QueryOptions} options - query options
   * @returns {UpdateResult}
   */
  async setUpdateMany(filter, update, options = {}) {
    return this._.updateMany(filter, { $set: update }, options);
  }

  // DELETE ======================================================================
  /**
   * Delete existing document by filter condition
   * @param {FilterQuery} filter - filter condition
   * @param {QueryOptions} [options={}] - query options
   * @returns {DeleteResult}
   */
  async deleteSingle(filter, options = {}) {
    return this._.deleteOne(filter, options);
  }

  /**
   * Delete existing document by filter condition
   * @param {ObjectId} id - id of document
   * @param {QueryOptions} [options={}] - query options
   * @returns {DeleteResult}
   */
  async deleteSingleById(id, options = {}) {
    return this._.deleteOne({ _id: ObjectId(id) }, options);
  }

  /**
   * Delete existing document by filter condition and return it
   * @param {FilterQuery} filter - filter condition
   * @param {QueryOptions} [options={}] - query options
   * @returns {ReadResult}
   */
  async getSingleAndDelete(filter, options = {}) {
    return this._.findOneAndDelete(filter, options).lean();
  }

  /**
   * Delete all existing documents by filter condition
   * @param {FilterQuery} filter - filter condition
   * @param {QueryOptions} [options={}] - query options
   * @returns {DeleteResult}
   */
  async deleteMany(filter, options = {}) {
    return this._.deleteMany(filter, options);
  }
}

module.exports = { Provider };
