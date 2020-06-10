import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import { State, Branch, Leaf, initialState } from 'react-nested-filter';
import { Schema, DefaultFieldDefinitions } from 'react-nested-filter';
import { invert } from 'lodash';

interface FilterObject {
  operator: string;
  value?: any;
}

type FilterValue = Filter[] | FilterObject[] | FilterObject;

interface Filter {
  and?: Filter[] | null;
  or?: Filter[] | null;
  [x: string]: FilterValue | null | undefined;
}

const groupKey = (group: Branch) => (group.inclusive ? 'and' : 'or');

const serializeRule = (rule: Leaf) => ({ [rule.name]: omit(rule, 'group', 'name', 'path', 'id') });

const resourceGroupKey = <R extends string>(
  key: string,
  group: Branch,
  schema: Schema<R, DefaultFieldDefinitions>,
  parent?: Branch,
): string => {
  if (!parent) {
    return group.groups[key].resource;
  }

  return invert(schema[parent.resource as R].relations || {})[group.resource];
};

const serializeGroup = <R extends string>(group: Branch, schema: Schema<R, DefaultFieldDefinitions>): Filter => ({
  [groupKey(group)]: Object.keys(group.rules)
    .map((key) => serializeRule(group.rules[key]))
    .concat(
      Object.keys(group.groups).map((key) =>
        group.groups[key].resource === group.resource
          ? (serializeGroup(group.groups[key], schema) as any)
          : {
              [resourceGroupKey(key, group.groups[key], schema, group)]: [serializeGroup(group.groups[key], schema)],
            },
      ),
    ),
});

const serialize = <R extends string>(state: State, schema: Schema<R, DefaultFieldDefinitions>) => {
  return serializeGroup(state.tree, schema);
};

const deserializeRule = (name: string, rule: FilterObject, id: string, path: string[]): Leaf => {
  return {
    id,
    name,
    ...rule,
    path,
  };
};

const deserializeGroup = <R extends string>(
  schema: Schema<R, DefaultFieldDefinitions>,
  key: string,
  data: Filter[],
  resource: R,
  counter: { total: number },
  path: string[],
): State => {
  // Groups keyed by a resource or by "and" are inclusive, and exclusive if keyed by "or".
  const inclusive = key !== 'or';

  const rules: Record<string, Leaf> = {};
  const groups: Record<string, Branch> = {};

  // Groups keyed by a string other than "and" or "or" are resource groups.
  if (!(key === 'and' || key === 'or')) {
    resource = key as R;
  }

  data.forEach((datum) => {
    const datumKey = Object.keys(datum)[0];
    const id = counter.total++;

    // Add a "and" or "or" sub-group
    if (datumKey === 'and' || datumKey === 'or') {
      return (groups[id] = deserializeGroup(schema, `${id}`, datum[datumKey] as Filter[], resource, counter, [
        ...path,
        'groups',
        `${id}`,
      ]).tree);
    }

    const { relations } = schema[resource];

    const subResource = relations && relations[datumKey];

    // Add a relation sub-group
    if (subResource) {
      return (groups[id] = deserializeGroup(schema, `${id}`, datum[datumKey] as Filter[], subResource, counter, [
        ...path,
        'groups',
        `${id}`,
      ]).tree);
    }

    return (rules[id] = deserializeRule(datumKey, datum[datumKey] as FilterObject, `${id}`, [
      ...path,
      'rules',
      `${id}`,
    ]));
  });

  return {
    counter: counter.total,
    tree: {
      id: key,
      inclusive,
      resource,
      rules,
      groups,
      path,
    },
  };
};

const deserialize = <R extends string>(
  schema: Schema<R, DefaultFieldDefinitions>,
  resource: R,
  filter: Filter,
): State => {
  const key = Object.keys(filter)[0];

  if (!(key === 'and' || key === 'or')) {
    return initialState(resource).toJS();
  }

  const group = filter[key];

  if (isNil(group)) {
    return initialState(resource).toJS();
  }

  return deserializeGroup(schema, key, group, resource, { total: 0 }, ['tree']);
};

export { serialize, deserialize };
