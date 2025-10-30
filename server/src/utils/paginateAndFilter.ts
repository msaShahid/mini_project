import { Model, FilterQuery, PopulateOptions } from 'mongoose';

export interface PaginationParams {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationOptions {
  select?: string; 
  populate?: string | PopulateOptions | (string | PopulateOptions)[];
  maxLimit?: number; 
}

export interface PaginatedResponse<T> {
  data: T[];
  metaData: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * pagination + filtering utility
 * Supports: pagination, sorting, select, populate
 */
export const paginateAndFilter = async <T>(
  model: Model<T>,
  filter: FilterQuery<T> = {},
  params: PaginationParams = {},
  options: PaginationOptions = {}
): Promise<PaginatedResponse<T>> => {
  // Parse + normalize pagination
  const page = Math.max(Number(params.page) || 1, 1);
  const limit = Math.min(Number(params.limit) || 10, options.maxLimit || 100);
  const skip = (page - 1) * limit;

  // Sorting (safe defaults)
  const sortField = params.sortBy || 'createdAt';
  const sortOrder = params.sortOrder === 'asc' ? 1 : -1;
  const sort: Record<string, 1 | -1> = { [sortField]: sortOrder };

  // Build Mongoose query
  let query = model.find(filter).sort(sort).skip(skip).limit(limit);

  if (options.select) query = query.select(options.select);

  if (options.populate) {
    // Normalize populate into consistent structure
    const populateArray = Array.isArray(options.populate)
      ? options.populate
      : [options.populate];

    query = query.populate(
      populateArray.map((p) =>
        typeof p === 'string' ? { path: p } : p
      )
    );
  }

  // Run query & count in parallel
  const [data, total] = await Promise.all([
    query.exec(),
    model.countDocuments(filter),
  ]);

  // Meta info
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    metaData: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
