import { Schema, DefaultFieldDefinitions } from 'react-nested-filter';

export type Resources = 'customer' | 'order' | 'product';

export const schema: Schema<Resources, DefaultFieldDefinitions> = {
  customer: {
    fields: {
      id: {
        name: 'ID',
        type: 'id',
      },
      reference: {
        type: 'string',
      },
      full_name: {
        type: 'string',
        name: 'Full Name',
      },
      email: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
      created_at: {
        type: 'date',
        name: 'Created',
      },
      updated_at: {
        type: 'date',
        name: 'Updated',
      },
    },
    relations: {
      orders: 'order',
    },
  },
  order: {
    fields: {
      id: {
        name: 'ID',
        type: 'id',
      },
      reference: {
        type: 'string',
      },
      total: {
        type: 'number',
        fieldProps: {},
      },
      placed_at: {
        type: 'date',
        name: 'Placed',
      },
      completed_at: {
        type: 'date',
        name: 'Completed',
      },
      cancelled_at: {
        type: 'date',
        name: 'Cancelled',
      },
      created_at: {
        type: 'date',
        name: 'Created',
      },
      updated_at: {
        type: 'date',
        name: 'Updated',
      },
    },
    relations: {
      customer: 'customer',
      products: 'product',
    },
  },
  product: {
    fields: {
      id: {
        name: 'ID',
        type: 'id',
      },
      reference: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      amount: {
        type: 'number',
        fieldProps: {
          min: 0,
          max: 1000000000,
          step: 100,
        },
      },
      published_at: {
        type: 'date',
        name: 'Published',
      },
      archived_at: {
        type: 'date',
        name: 'Archived',
      },
      available: {
        type: 'boolean',
      },
      created_at: {
        type: 'date',
        name: 'Created',
      },
      updated_at: {
        type: 'date',
        name: 'Updated',
      },
    },
    relations: {
      customer: 'customer',
      orders: 'order',
    },
  },
};
